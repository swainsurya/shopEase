import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import products from '@/constants/products';
import { ProductSection } from '@/components';

const CartPage = () => {
    const [cartItems, setCartItems] = useState(products.slice(0, 5).map(item => ({ ...item, quantity: 1 })));
    const SponseredProduct = products.slice(0,8);
    const updateQuantity = (id, newQuantity) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    return (
        <div className="mt-5 md:mt-10 px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Your Cart</h1>
            
            <div className="w-full flex flex-col gap-6 p-6 rounded-lg shadow-lg">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-lg shadow-md border-2 border-white">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-32 h-32 object-contain rounded-lg shadow-sm"
                            />
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold">{item.name}</h2>
                                <p className="text-lg">{item.description}</p>
                                <div className="text-xl font-semibold text-green-600">${item.price}</div>
                                <div className="flex items-center gap-2 mt-2">
                                    <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-lg font-medium">-</Button>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-lg font-medium">+</Button>
                                </div>
                            </div>
                            <Button onClick={() => removeItem(item.id)} className="bg-red-700 text-white shadow-md hover:bg-red-600 px-4 py-2 text-lg font-medium transition-all duration-300 hover:scale-105">
                                Remove
                            </Button>
                        </div>
                    ))
                ) : (
                    <p className="text-xl text-gray-700">Your cart is empty.</p>
                )}
            </div>
            
            {cartItems.length > 0 && (
                <div className="flex justify-end mt-6">
                    <Button className="bg-blue-800 text-white shadow-md hover:bg-blue-700 px-6 py-3 text-lg font-medium transition-all duration-300 hover:scale-105">
                        Proceed to Checkout
                    </Button>
                </div>
            )}
            <ProductSection sectionName={"Sponsered Products"} products={SponseredProduct} />
        </div>
    );
};

export default CartPage;
