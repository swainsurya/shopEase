import { AdminProducts } from '@/components';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('products');

  return (
    <div className='max-w-screen-xl mx-auto p-4'>
      {/* Top Bar */}
      <h5 className='text-red-600 font-bold text-xl text-center'>HI SURYA THE ADMIN</h5>
      <nav className='bg-gray-900 flex items-center justify-around py-4 text-white rounded-md'>
        <Link to={"/"}
          className={`text-xl font-bold p-2 rounded-md ${activeSection === 'home' ? 'bg-red-500' : ''}`}
        >
          Home
        </Link>
        <button
          className={`text-xl font-bold p-2 rounded-md ${activeSection === 'orders' ? 'bg-red-500' : ''}`}
          onClick={() => setActiveSection('orders')}
        >
          Manage Orders
        </button>
        <button
          className={`text-xl font-bold p-2 rounded-md ${activeSection === 'products' ? 'bg-red-500' : ''}`}
          onClick={() => setActiveSection('products')}
        >
          Manage Products
        </button>
      </nav>

      {/* Content Section */}
      <div className='mt-6 shadow-lg rounded-md p-6'>
        {activeSection === 'orders' && (
          <div>
            <h2 className='text-2xl font-bold mb-4'>Orders</h2>
            <p>Manage all customer orders here.</p>
          </div>
        )}
        {activeSection === 'products' && (
          <AdminProducts />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
