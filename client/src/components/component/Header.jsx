import React from "react";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  let cartCount = 0;
  return (
    <header className="bg-gray-900 shadow-md flex justify-between items-center text-gray-900 sticky top-0 z-50 p-4">
      <h1 className="text-2xl font-extrabold text-white cursor-pointer">SHOP EASE</h1>
      <form className="w-1/3 relative h-10">
        <Input type="text" placeholder="Search products..." className="w-full text-black border-gray-300 bg-white h-full">
        </Input>
        <span className="bg-yellow-500 hover:bg-yellow-600 absolute top-0 right-0 p-2 rounded-r-md cursor-pointer">
          <Search />
        </span>
      </form>
      <div className="space-x-4 flex items-center">
        <button className="relative">
          <ShoppingCart size={34} className="text-white" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full px-1">{cartCount}</span>
          )}
        </button>
        <Button variant="outline" className="text-blue-800 border-blue-800">Login</Button>
        <Button variant="default" className="bg-blue-800 border-blue-800 hover:bg-blue-700">Signup</Button>
      </div>
    </header>
  );
};

export default Header;
