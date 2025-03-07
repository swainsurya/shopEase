import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useUser } from '@/context/userContext';

const ProfilePage = () => {
    const {user, setUser} = useUser()

    const handleChange = (e) => {
        const { name, value } = e.target;
        // setUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleLogout = async() => {
        await axios.post("/api/user/logout")
        setUser(null)
    };

    return (
        <div className="flex flex-col items-center py-5 md:py-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Profile</h1>
            <div className="p-6 rounded-lg shadow-lg w-full max-w-2xl bg-gray-100 dark:bg-gray-800">
                <div className="grid grid-cols-1 gap-4">
                    <input type="text" name="fullName" value={user?.username||"surya"} onChange={handleChange} placeholder="Full Name" className="p-2 border rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                    <input type="email" name="email" value={user?.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                    <input type="text" name="phone" value={user?.phone || "909012121"} onChange={handleChange} placeholder="Phone" className="p-2 border rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" name="address1" value={user?.address || "BHUbaneswar"} onChange={handleChange} placeholder="Address Line 1" className="p-2 border rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                        <input type="text" name="address2" value={user?.address2 || "Balugaon"} onChange={handleChange} placeholder="Address Line 2" className="p-2 border rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <input type="text" name="city" value={user?.city || "Balugaon"} onChange={handleChange} placeholder="City" className="p-2 border rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                        <input type="text" name="state" value={user?.state || "Odisha"} onChange={handleChange} placeholder="State" className="p-2 border rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                        <input type="text" name="country" value={user?.country || "India"} onChange={handleChange} placeholder="Country" className="p-2 border rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                    </div>
                    <input type="text" name="pincode" value={user?.pincode || "752031"} onChange={handleChange} placeholder="Pincode" className="p-2 border rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                </div>
                <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
                    <Button className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-400">Save</Button>
                    <Button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-red-600 dark:hover:bg-red-400">Logout</Button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;