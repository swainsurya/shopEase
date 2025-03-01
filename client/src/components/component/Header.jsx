import React, { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, User, Home, Edit, Package, Settings, LogOut, Menu, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";

const Header = () => {
  let cartCount = 9;
  const user = { isLoggedIn: true, name: "Surakanth" }; // Example user object
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-gray-900 shadow-md flex justify-between items-center text-gray-900 sticky top-0 z-50 p-4">
        <Link to={"/"} className="text-2xl font-extrabold text-white cursor-pointer">SHOP EASE</Link>

        <form className="hidden md:block w-1/3 relative h-10">
          <Input type="text" placeholder="Search products..." className="w-full text-black border-gray-300 bg-white h-full" />
          <span className="bg-yellow-500 hover:bg-yellow-600 absolute top-0 right-0 p-2 rounded-r-md cursor-pointer">
            <Search />
          </span>
        </form>

        <div className="space-x-4 hidden md:flex items-center">
          <button className="relative">
            <ShoppingCart size={34} className="text-white" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full px-1">{cartCount}</span>
            )}
          </button>

          {user.isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 text-white">
                <User size={28} />
                <span>Hi, {user.name}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                  <Link to="/" className="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-100">
                    <Home size={18} className="mr-2" /> ShopEase
                  </Link>
                  <Link to="/edit-profile" className="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-100">
                    <Edit size={18} className="mr-2" /> Edit Profile
                  </Link>
                  <Link to="/my-orders" className="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-100">
                    <Package size={18} className="mr-2" /> My Orders
                  </Link>
                  <Link to="/change-name" className="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-100">
                    <Settings size={18} className="mr-2" /> Change Name
                  </Link>
                  <button className="flex items-center w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100">
                    <LogOut size={18} className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline" className="text-blue-800 border-blue-800">Login</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="default" className="bg-blue-800 border-blue-800 hover:bg-blue-700">Signup</Button>
              </SignUpButton>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {
          user.isLoggedIn ? (
            <Sun size={30} className="text-white md:hidden"/>
          ) : (
            <Button variant="outline" className="text-blue-800 border-blue-800 md:hidden">Login</Button>
          )
        }
      </header>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around py-2 md:hidden border-t border-gray-700">
        <Link to="/" className="flex flex-col items-center">
          <Home size={24} />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/my-orders" className="flex flex-col items-center">
          <Package size={24} />
          <span className="text-xs">Orders</span>
        </Link>
        <Link to="/cart" className="flex flex-col items-center relative">
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full px-1">{cartCount}</span>
          )}
          <span className="text-xs">Cart</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center">
          <User size={24} />
          <span className="text-xs">Profile</span>
        </Link>
      </nav>
    </>
  );
};

export default Header;
