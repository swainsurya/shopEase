import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import products from '@/constants/products';
import { ProductSection } from '@/components';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/userContext';
import axios from 'axios';
import { toast } from 'sonner';

const CartPage = () => {
    const { user , getProducts } = useUser()
    const [cartItems, setCartItems] = useState(user?.carts || []);
    const [refreshCart, setRefreshCart] = useState(false);
    const [SponseredProduct, setSponseredProducts] = useState(getProducts?.slice(0,8) || [])
    const updateQuantity = (id, newQuantity) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
        ));
    };

    const getCartItms = async() => {
        try {
            const req = await axios.get("https://shopease-server-f7ke.onrender.com/api/cart")
            const carts = req?.data
            console.log(carts)
            setCartItems(carts)
        } catch (error) {
            toast.error("Server  Issue")
        }
    }

    useEffect(()=>{
        setCartItems(user?.carts)
        getCartItms()
    },[user,refreshCart])

    const removeItem = async(cartId) => {
        try {
            await axios.post("https://shopease-server-f7ke.onrender.com/api/cart/remove",{cartId})
            setCartItems(prev => prev.filter((item)=>item.cartId!=cartId))
            setRefreshCart(prev=>!prev)
            toast.success("Item removed")
        } catch (error) {
            
        }
    };

    return (
        <div className="py-5 md:py-10 px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Your Cart</h1>
            
            <div className="w-full flex flex-col gap-6 p-6 rounded-lg shadow-lg">
                {cartItems?.length > 0 ? (
                    cartItems?.reverse().map((item) => (
                        <div key={item?._id} className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-lg shadow-md border-2 border-white">
                            <img 
                                src={item?.productImage} 
                                alt={item?.name} 
                                className="w-32 h-32 object-contain rounded-lg shadow-sm"
                            />
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold">{item?.productName}</h2>
                                <p className="text-lg">{item?.description}</p>
                                <div className="text-xl font-semibold text-green-600">${item.productPrice}</div>
                                <div className="flex items-center gap-2 mt-2">
                                    <Button onClick={() => updateQuantity(item?._id, item.quantity - 1)} className="px-2 py-1 text-lg font-medium">-</Button>
                                    <span className="text-lg font-semibold">{item?.qty}</span>
                                    <Button onClick={() => updateQuantity(item?._id, item.quantity + 1)} className="px-2 py-1 text-lg font-medium">+</Button>
                                </div>
                            </div>
                            <Button onClick={() => removeItem(item?._id)} className="bg-red-700 text-white shadow-md hover:bg-red-600 px-4 py-2 text-lg font-medium transition-all duration-300 hover:scale-105">
                                Remove
                            </Button>
                        </div>
                    ))
                ) : (
                    <p className="text-xl text-gray-700">Your cart is empty.</p>
                )}
            </div>
            
            {cartItems?.length > 0 && (
                <div className="flex justify-end mt-6">
                    <Link to={"/check-out"} className="bg-blue-800 text-white shadow-md hover:bg-blue-700 px-6 py-3 text-lg font-medium transition-all duration-300 hover:scale-105">
                        Proceed to Checkout
                    </Link>
                </div>
            )}
            <ProductSection sectionName={"Sponsered Products"} products={SponseredProduct} />
        </div>
    );
};

export default CartPage;
