import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { useUser } from '@/context/userContext';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';

const AdminProducts = () => {

  const {getProducts , setIsProductAdded , isProductAdded , setProducts} = useUser()
  const [loading , setLoading] = useState(false) ;
  const [isAddDialogOpen , setIsAddDialogOpne] = useState(false);

  const [newProduct, setNewProduct] = useState({ name: '', description: '',category:'' ,price: '', image: '' });

  const addProduct = async(e) => {
    e.preventDefault();
    setLoading(true)
    if(!newProduct.name && !newProduct.description && !newProduct.category && !newProduct.price && !newProduct.image){
      toast.error("All fields are mandatory")
      setLoading(false)
      return;
    }
    try {
      const req = await axios.post("https://shopease-server-f7ke.onrender.com/api/admin/product/add",newProduct)
      const item = req.data.product
      setProducts([...getProducts,item])
      console.log(req.data.product)
      toast.success(req.data.message)
      setIsProductAdded(prev=>!prev)
      setIsAddDialogOpne(false)
    } catch (error) {
      toast.error("Something went wrong")
    }
    finally{
      setLoading(false)
    }
  };

  const deleteProduct = async(id) => {
    if(!confirm("Are you sure ?")) return
    try {
      const req = await axios.delete(`https://shopease-server-f7ke.onrender.com/api/admin/product/del/${id}`)
      toast.success("Deleted")
      setIsProductAdded(prev=>!prev)
    } catch (error) {
      toast.error("Something went wrong")
    }
  };

  const removeAllProducts = () => {
    setProducts([]);
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Products</h2>
      <p>Manage all products available in the store.</p>
      {/* Product List */}
      <div className='mt-6'>
        <h3 className='text-xl font-bold mb-4'>Product List</h3>
        {getProducts.length > 0 && (
          <Button
            className='bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md mb-4'
            onClick={removeAllProducts}
          >
            Remove All
          </Button>
        )}
        <Button onClick={e=>setIsAddDialogOpne(true)} className='mx-10 py-2 px-4'>Add Products</Button>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {getProducts.map((product) => (
            <div key={product._id} className='border p-4 rounded-lg shadow-md relative'>
              <img src={product.image} alt={product.name} className='w-full h-64 object-contain rounded-md mb-2' />
              <h4 className='text-lg font-bold'>{product.name}</h4>
              <p className=''>${product.price}</p>
              <div className='flex gap-2 mt-2'>
                <button className='text-blue-600'><FaEdit /></button>
                <button className='text-red-600' onClick={() => deleteProduct(product._id)}><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog shadcn for adding product*/} 
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpne}>
        <DialogContent>
          <DialogHeader>Add Products</DialogHeader>
          <form className='mt-4 flex flex-col gap-2' onSubmit={addProduct}>
            <input
              type='text'
              placeholder='Product Name'
              className='border p-2 rounded w-full'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type='text'
              placeholder='Product Description'
              className='border p-2 rounded w-full'
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <input
              type='text'
              placeholder='Product Category'
              className='border p-2 rounded w-full'
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <input
              type='number'
              placeholder='Price'
              className='border p-2 rounded w-full'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              type='text'
              placeholder='Image URL'
              className='border p-2 rounded w-full'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <button type='submit' className='bg-blue-600 px-4 py-2 rounded-md flex items-center text-white font-bold justify-center'>
              {
                loading?(<Loader2 className='animate-spin text-white'/>): <p>Add Product</p>
              }
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for editing the product */}
    </div>
  )
}

export default AdminProducts;
