import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import products from '@/constants/products';
import { User } from 'lucide-react';
import { useUser } from '@/context/userContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
    const {user, setLoading} = useUser()
    const [cartItems, setCartItems] = useState(user?.carts);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [savedAddresses, setSavedAddresses] = useState([user?.address]||[]);
    const [address, setAddress] = useState(user?.address);
    const [totalP , setTotalP] = useState(0)
    const navigate = useNavigate()

    const updateQuantity = (id, newQuantity) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
        ));
    };

    const removeItem = async(id) => {
        try {
            await axios.post("/api/cart/remove",{cartId: id})
            setCartItems([])
            setCartItems(prev=> prev.filter((item)=> item._id != id))
            toast.success("Item removed")
        } catch (error) {
            toast.error("Server issue")
        }
    };

    // Getting total price 
    const totalPrice = () => {
        let total = 0;
        for(let i=0; i<cartItems?.length ; i++) {
            let price = cartItems[i]?.productPrice*cartItems[i]?.qty
            total += price ;
        }
        setTotalP(Math.round(total))
    }

    // Place order 
    const placeOrder = async() => {
        if(!user?.address) {
            toast.error("Please add address in you profile")
            navigate("/profile")
            return;
        }
        if(cartItems.length <= 0) {
            toast.error("There are no items please add items to cart")
            navigate("/")
            return;
        }
            cartItems.map(async(item)=> {
                const req = await axios.post("https://shopease-server-f7ke.onrender.com/api/orders/add",{productName: item.productName, productImage: item.productImage, price: item.productPrice})
                console.log(req)
                if(req) toast.success("Order Confirmed")
            })
            console.log(user)
    }

    useEffect(()=>{
        totalPrice()
    },[user])

    return (
        <div className="md:py-10 px-4 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl md:text-5xl font-bold ">Checkout</h1>
                {isLoggedIn && <User size={32} className=" mt-2 md:mt-0" />}
            </div>
            
            <div className="w-full p-4 md:p-6 rounded-lg shadow-lg overflow-x-hidden">
                <table className="w-full rounded-lg shadow-md text-sm md:text-base">
                    <thead>
                        <tr className="text-xs md:text-base">
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
                            <tr key={item?._id} className="border-b text-xs md:text-base">
                                <td className="p-2 md:p-3"><img src={item?.productImage} alt={item?.productName} className="w-12 h-12 md:w-16 md:h-16 object-contain" /></td>
                                <td className="p-2 md:p-3  font-semibold hidden md:table-cell">{item?.productName}</td>
                                <td className="p-2 md:p-3 text-green-600">${item?.productPrice}</td>
                                <td className="p-2 md:p-3">
                                    <div className="flex items-center gap-1 md:gap-2">
                                        <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} className=" px-1 py-1 md:px-2 md:py-1">-</Button>
                                        <span className="text-sm md:text-lg font-semibold">{item?.qty}</span>
                                        <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} className=" px-1 py-1 md:px-2 md:py-1">+</Button>
                                    </div>
                                </td>
                                <td className="p-2 md:p-3">${item?.productPrice * item?.qty}</td>
                                <td className="p-2 md:p-3">
                                    <Button onClick={() => removeItem(item?._id)} className="bg-red-700 px-2 py-1 md:px-3 md:py-1 hover:bg-red-600 dark:text-white">Remove</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-lg md:text-xl font-semibold text-right mt-4">Total: ${totalP}</div>
            </div>

            {cartItems.length ==0 && (
                <div>
                    No items found
                </div>
            )}
            
            <div className="mt-6 p-4 md:p-6 rounded-lg shadow-lg">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Shipping Address</h2>
                {savedAddresses.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Saved Addresses</h3>
                        <select className="w-full p-2 md:p-3 border border-gray-300 rounded-lg text-sm md:text-lg mt-2 bg-transparent">
                            <option value="" className='bg-transparent text-black'>Select a saved address</option>
                            {savedAddresses?.map((addr, index) => (
                                <option className='bg-transparent text-black' key={index} value={addr?.fullName}>{addr?.fullName}, {addr?.phone}, {addr?.address1}, {addr?.address2}, {addr?.city}, {addr?.state}, {addr?.country}, {addr?.pincode}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                    {
                        address && Object.keys(address).map((key) => (
                            key!="_id"?
                            (
                                <input 
                                key={key} 
                                className="p-2 md:p-3 border border-gray-300 rounded-lg text-sm md:text-base bg-transparent" 
                                placeholder={key.replace(/([A-Z])/g, ' $1').trim()} 
                                value={address[key]} 
                                onChange={(e) => setAddress({...address, [key]: e.target.value})} 
                            />
                            ):""
                        ))
                    }
                </div>
                <Button onClick={placeOrder} className="mt-4 bg-blue-800 text-white shadow-md hover:bg-blue-700 px-4 py-2 md:px-6 md:py-3 text-base md:text-lg w-full">
                    Place Order
                </Button>
            </div>
        </div>
    );
};

export default CheckoutPage;