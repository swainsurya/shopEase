import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {

  const {pathname} = useLocation()

  return (
    <footer className={`bg-gray-900 text-white py-8 ${pathname=="/login"?"hidden":""}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ShopEase</h3>
            <p className="text-gray-400">Your one-stop shop for all your needs.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="text-gray-400">
              <li className="mb-2"><a href="#" className="hover:text-white">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Products</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Categories</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-700">
                <Facebook/>
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600">
                <Twitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
