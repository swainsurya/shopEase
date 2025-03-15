import React, { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, User, Home, Edit, Package, Settings, LogOut, Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/context/userContext";
import axios from "axios";
import useProduct from "@/hooks/useProduct";

const Header = () => {
  const { user, setUser } = useUser()
  const { cart, increaseCart, cartCount } = useProduct(user)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [mode, setMode] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    setMode(localStorage.getItem("mode"))
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDark = () => {
    localStorage.removeItem("mode")
    localStorage.setItem("mode", "dark")
    setMode(localStorage.getItem("mode"))
    console.log("Dark")
    document.getElementsByTagName("main")[0].classList.add("dark")
  }

  const handleLight = () => {
    localStorage.removeItem("mode")
    setMode("")
    console.log("light")
    document.getElementsByTagName("main")[0].classList.remove("dark")
  }

  const handleLogout = async () => {
    await axios.post("/api/user/logout")
    setUser(null)
  }

  const handleSearch = async(e) => {
    if(!searchTerm) return;
    else {
      navigate(`/search/q/${searchTerm}`)
      setSearchTerm("")
    }
  }

  useEffect(() => {
    setMode(localStorage.getItem("mode"))
  }, [mode])

  return (
    <>
      <header className={`bg-gray-900 shadow-md flex justify-between items-center text-gray-900 sticky top-0 z-50 p-2 md:p-4 ${pathname == "/login" || pathname == "/admin" ? "hidden" : ""}`}>
        <Link to={"/"} className="text-sm md:text-2xl font-extrabold text-white cursor-pointer">SHOP EASE</Link>

        {/* Search Form */}
        <div className="hidden md:block w-1/3 relative h-10">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full text-black border-gray-300 bg-white h-full"
            value={searchTerm}
            onChange={e=>setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} className="bg-yellow-500 hover:bg-yellow-600 absolute top-0 right-0 p-2 rounded-r-md cursor-pointer">
            <Search />
          </button>
        </div>

        <div className="space-x-4 hidden md:flex items-center">
          {
            mode == "dark" ? (<Sun onClick={handleLight} size={24} className="text-white cursor-pointer hidden md:block hover:text-white/80" />) : (
              <Moon onClick={handleDark} size={24} className="text-white cursor-pointer hidden md:block hover:text-white/80" />
            )
          }
          <Link to={"/cart"} className="relative">
            <ShoppingCart size={34} className="text-white" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full px-1">{cartCount}</span>
            )}
          </Link>


          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 text-white">
                <User size={28} />
                <span>Hi, {user.username}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                  <Link to="/" className="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-100">
                    <Home size={18} className="mr-2" /> ShopEase
                  </Link>
                  <Link to="/profile" className="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-100">
                    <Edit size={18} className="mr-2" /> Edit Profile
                  </Link>
                  <Link to="/order" className="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-100">
                    <Package size={18} className="mr-2" /> My Orders
                  </Link>
                  <Link to="/profile" className="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-100">
                    <Settings size={18} className="mr-2" /> Change Name
                  </Link>
                  <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100">
                    <LogOut size={18} className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to={"/login"}>
                <Button variant="outline" className="text-blue-800 border-blue-800">Login</Button>
              </Link>
              <Link to={"/login"}>
                <Button variant="default" className="bg-blue-800 border-blue-800 hover:bg-blue-700">Signup</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {
          user ? (
            <div className="md:hidden p-2">
              {
                mode == "dark" ? (<Sun onClick={handleLight} size={20} className="text-white md:hidden" />) : (<Moon onClick={handleDark} size={20} className="text-white md:hidden" />)
              }
            </div>
          ) : (
            <div className="md:hidden flex items-center gap-3">
              {
                mode == "dark" ? (<Sun onClick={handleLight} size={20} className="text-white md:hidden" />) : (<Moon onClick={handleDark} size={20} className="text-white md:hidden" />)
              }
              <Link to={"/login"}>
                <Button variant="outline" className="text-blue-800 border-blue-800 text-sm px-2 py-1 md:hidden">Login</Button>
              </Link>
            </div>
          )
        }
      </header>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around py-2 md:hidden border-t border-gray-700">
        <Link to="/" className="flex flex-col items-center">
          <Home size={24} />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/order" className="flex flex-col items-center">
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
