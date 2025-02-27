import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
    let cartCount = 0;
  return (
    <header className="bg-white shadow-md py-3 flex justify-between items-center text-gray-900 sticky top-0 z-50">
      <h1 className="text-2xl font-extrabold text-blue-800">SHOP-EASE</h1>
      <Input type="text" placeholder="Search products..." className="w-1/3 text-gray-900 border-gray-300" />
      <div className="space-x-4 flex items-center">
        <button className="relative">
          <ShoppingCart size={34} />
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
