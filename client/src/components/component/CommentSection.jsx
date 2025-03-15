import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useUser } from "@/context/userContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function CommentSection({ productId, product }) {
  const [comments, setComments] = useState(product?.comments || []);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  // get product by id
  const getProductById = async () => {
    const req = await axios.get(`/api/product/product/${productId}`)
    const item = req.data.product
    setComments(item.comments)
  }

  useEffect(()=>{
    getProductById()
  },[productId,loading])


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!newComment) {
      toast.error("Its cannot be empty")
      setLoading(false)
      return;
    }
    try {
      const req = await axios.post(`/api/product/comment/${productId}`, { message: newComment })
      if(!req.data.product) {
        // unathorized user
        toast.error(req.data.message)
        navigate("/login")
      }
      else {
        toast.success("Comment added")
      }
    } catch (error) {
      toast.error(error.response.message)
    }
    finally {
      setLoading(false)
      setNewComment('')
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded text-black"
          rows="3"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <Button type="submit" className="mt-2 w-full text-white bg-blue-700 hover:bg-blue-800 h-10 flex">
          {
            loading ? (<Loader2 className="animate-spin" />) : "Post Comment"
          }
        </Button>
      </form>
      <div>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="border-b py-2">
              <p>{comment.message}</p>
              <p className="font-semibold">{comment.username} <span className="text-sm text-gray-300">({ formatDistanceToNow(new Date(comment.createdAt), {addSuffix: true}) })</span></p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
