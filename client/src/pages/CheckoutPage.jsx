import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import products from '@/constants/products';
import { User } from 'lucide-react';

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState(products.slice(0, 5).map(item => ({ ...item, quantity: 1 })));
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [savedAddresses, setSavedAddresses] = useState([
        { fullName: "John Doe", phone: "9876543210", address1: "Street 123", address2: "Apartment 456", city: "City", state: "State", country: "Country", pincode: "123456" },
        { fullName: "Jane Smith", phone: "8765432109", address1: "Lane 789", address2: "Building 101", city: "Town", state: "Province", country: "Country", pincode: "654321" }
    ]);
    const [address, setAddress] = useState({ fullName: "", phone: "", address1: "", address2: "", city: "", state: "", country: "", pincode: "" });

    const updateQuantity = (id, newQuantity) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="mt-5 md:mt-10 px-4 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl md:text-5xl font-bold text-gray-800">Checkout</h1>
                {isLoggedIn && <User size={32} className="text-gray-800 mt-2 md:mt-0" />}
            </div>
            
            <div className="w-full bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg overflow-x-hidden">
                <table className="w-full bg-white rounded-lg shadow-md text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 text-xs md:text-base">
                            <th className="p-2 md:p-3">Image</th>
                            <th className="p-2 md:p-3 hidden md:table-cell">Product</th>
                            <th className="p-2 md:p-3">Price</th>
                            <th className="p-2 md:p-3">Quantity</th>
                            <th className="p-2 md:p-3">Total</th>
                            <th className="p-2 md:p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className='overflow-hidden'>
                        {cartItems.map((item) => (
                            <tr key={item.id} className="border-b text-xs md:text-base">
                                <td className="p-2 md:p-3"><img src={item.image} alt={item.name} className="w-12 h-12 md:w-16 md:h-16 object-contain" /></td>
                                <td className="p-2 md:p-3 text-gray-900 font-semibold hidden md:table-cell">{item.name}</td>
                                <td className="p-2 md:p-3 text-green-600">${item.price}</td>
                                <td className="p-2 md:p-3">
                                    <div className="flex items-center gap-1 md:gap-2">
                                        <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-300 text-black px-1 py-1 md:px-2 md:py-1">-</Button>
                                        <span className="text-sm md:text-lg font-semibold">{item.quantity}</span>
                                        <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-300 text-black px-1 py-1 md:px-2 md:py-1">+</Button>
                                    </div>
                                </td>
                                <td className="p-2 md:p-3 text-gray-900">${item.price * item.quantity}</td>
                                <td className="p-2 md:p-3">
                                    <Button onClick={() => removeItem(item.id)} className="bg-red-700 text-white px-2 py-1 md:px-3 md:py-1 hover:bg-red-600">Remove</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-lg md:text-xl font-semibold text-right mt-4">Total: ${totalPrice}</div>
            </div>
            
            <div className="mt-6 p-4 md:p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
                {savedAddresses.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">Saved Addresses</h3>
                        <select className="w-full p-2 md:p-3 border border-gray-300 rounded-lg text-sm md:text-lg mt-2">
                            <option value="">Select a saved address</option>
                            {savedAddresses.map((addr, index) => (
                                <option key={index} value={addr.fullName}>{addr.fullName}, {addr.phone}, {addr.address1}, {addr.address2}, {addr.city}, {addr.state}, {addr.country}, {addr.pincode}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                    {Object.keys(address).map((key) => (
                        <input 
                            key={key} 
                            className="p-2 md:p-3 border border-gray-300 rounded-lg text-sm md:text-base" 
                            placeholder={key.replace(/([A-Z])/g, ' $1').trim()} 
                            value={address[key]} 
                            onChange={(e) => setAddress({...address, [key]: e.target.value})} 
                        />
                    ))}
                </div>
                <Button className="mt-4 bg-blue-800 text-white shadow-md hover:bg-blue-700 px-4 py-2 md:px-6 md:py-3 text-base md:text-lg w-full">
                    Place Order
                </Button>
            </div>
        </div>
    );
};

export default CheckoutPage;