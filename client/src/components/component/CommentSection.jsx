import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CommentSection() {
  const [comments, setComments] = useState([
    { name: "John Doe", date: "2025-02-27", text: "Great product! Totally worth it." },
    { name: "Jane Smith", date: "2025-02-26", text: "I love the quality of this item!" },
    { name: "Alice Brown", date: "2025-02-25", text: "Fast shipping and excellent service." },
    { name: "Mark Johnson", date: "2025-02-24", text: "Highly recommend this to everyone!" },
    { name: "Emily White", date: "2025-02-23", text: "Not satisfied, expected better quality." }
  ]);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newEntry = {
        name: "Guest User",
        date: new Date().toISOString().split("T")[0],
        text: newComment
      };
      setComments([...comments, newEntry]);
      setNewComment("");
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          rows="3"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <Button type="submit" className="mt-2 w-full bg-blue-700 hover:bg-blue-800 h-10">Post Comment</Button>
      </form> 
      <div>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="border-b py-2">
              <p>{comment.text}</p>
              <p className="text-white/80 font-semibold">{comment.name} <span className="text-sm">({comment.date})</span></p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
