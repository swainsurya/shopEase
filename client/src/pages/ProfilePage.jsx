import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
    const [user, setUser] = useState({
        fullName: "John Doe",
        email: "johndoe@example.com",
        phone: "9876543210",
        address1: "Street 123",
        address2: "Apartment 456",
        city: "City",
        state: "State",
        country: "Country",
        pincode: "123456"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleLogout = () => {
        console.log("User logged out");
    };

    return (
        <div className="flex flex-col items-center mt-5 md:mt-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 w-full">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">Profile</h1>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <div className="grid grid-cols-1 gap-4">
                    <input type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Full Name" className="p-2 border rounded w-full" />
                    <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded w-full" />
                    <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" className="p-2 border rounded w-full" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" name="address1" value={user.address1} onChange={handleChange} placeholder="Address Line 1" className="p-2 border rounded w-full" />
                        <input type="text" name="address2" value={user.address2} onChange={handleChange} placeholder="Address Line 2" className="p-2 border rounded w-full" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <input type="text" name="city" value={user.city} onChange={handleChange} placeholder="City" className="p-2 border rounded w-full" />
                        <input type="text" name="state" value={user.state} onChange={handleChange} placeholder="State" className="p-2 border rounded w-full" />
                        <input type="text" name="country" value={user.country} onChange={handleChange} placeholder="Country" className="p-2 border rounded w-full" />
                    </div>
                    <input type="text" name="pincode" value={user.pincode} onChange={handleChange} placeholder="Pincode" className="p-2 border rounded w-full" />
                </div>
                <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
                    <Button className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto">Save</Button>
                    <Button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto">Logout</Button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
