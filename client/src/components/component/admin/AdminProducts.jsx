import React, { useState } from 'react'

const AdminProducts = () => {

  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 100, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Product 2', price: 200, image: 'https://via.placeholder.com/100' }
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

  const addProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.image) {
      setProducts([...products, { id: products.length + 1, ...newProduct }]);
      setNewProduct({ name: '', price: '', image: '' });
    }
  };
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Products</h2>
      <p>Manage all products available in the store.</p>
      <form className='mt-4 flex flex-col gap-2' onSubmit={addProduct}>
        <input
          type='text'
          placeholder='Product Name'
          className='border p-2 rounded w-full'
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
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
        <button className='bg-blue-600 text-white px-4 py-2 rounded-md'>Add Product</button>
      </form>
      {/* Product List */}
      <div className='mt-6'>
        <h3 className='text-xl font-bold mb-4'>Product List</h3>
        {products.length > 0 && (
          <button
            className='bg-red-600 text-white px-4 py-2 rounded-md mb-4'
            onClick={removeAllProducts}
          >
            Remove All
          </button>
        )}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.map((product) => (
            <div key={product.id} className='border p-4 rounded-lg shadow-md relative'>
              <img src={product.image} alt={product.name} className='w-full h-32 object-cover rounded-md mb-2' />
              <h4 className='text-lg font-bold'>{product.name}</h4>
              <p className='text-gray-600'>${product.price}</p>
              <div className='flex gap-2 mt-2'>
                <button className='text-blue-600'><FaEdit /></button>
                <button className='text-red-600' onClick={() => deleteProduct(product.id)}><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminProducts;
