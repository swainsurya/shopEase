import { AdminProducts } from '@/components';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('orders');

  return (
    <div className='max-w-screen-xl mx-auto p-4'>
      {/* Top Bar */}
      <nav className='bg-gray-900 flex items-center justify-around py-4 text-white rounded-md'>
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
      <div className='mt-6 bg-white shadow-lg rounded-md p-6'>
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
