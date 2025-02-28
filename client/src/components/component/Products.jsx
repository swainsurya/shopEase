import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigUp, ArrowUp } from "lucide-react";

const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$79.99",
      description: "Experience crystal-clear sound with noise cancellation.",
      image: "https://m.media-amazon.com/images/I/713SsA7gftL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 2,
      name: "Smartwatch Pro",
      price: "$199.99",
      description: "Track your fitness and stay connected on the go.",
      image: "https://m.media-amazon.com/images/I/713SsA7gftL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: "$49.99",
      description: "Ergonomic design with customizable RGB lighting.",
      image: "https://m.media-amazon.com/images/I/713SsA7gftL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: "$59.99",
      description: "Portable and powerful sound with deep bass.",
      image: "https://m.media-amazon.com/images/I/71bbJj2y7ZL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 5,
      name: "4K Action Camera",
      price: "$299.99",
      description: "Capture stunning videos with 4K UHD resolution.",
      image: "https://m.media-amazon.com/images/I/713SsA7gftL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 6,
      name: "Mechanical Keyboard",
      price: "$129.99",
      description: "Premium mechanical keys with fast response time.",
      image: "https://m.media-amazon.com/images/I/713SsA7gftL._AC_UF1000,1000_QL80_.jpg",
    },
  ];

const ProductSection = ({ sectionName }) => {
    return (
        <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-800 uppercase">{sectionName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Card key={product.id} className="bg-white shadow-md border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-4 flex items-center justify-around gap-6">
                            <img src={product.image} alt={product.name} className="h-full w-1/3 object-cover rounded-md" />
                            <div className="flex flex-1 flex-col h-full justify-between items-center w-1/2">
                                <div className="flex flex-col min-w-full mb-10">
                                    <h3 className="mt-2 font-semibold text-gray-900 text-xl">{product.name}</h3>
                                    <p>{product.description}</p>
                                </div>
                                <p className="text-gray-700 text-xl mb-4 font-bold self-start">Price: {product.price}</p>
                                <div className="flex items-center gap-5">
                                    {/* Quantity */}
                                    <div className="flex items-center">
                                        <span>Qty 1</span>
                                        <ArrowUp size={20}/>
                                    </div>
                                    <Button className="mt-2 bg-blue-800 text-white shadow-md hover:bg-blue-700 w-[120px]">Add to Cart</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default ProductSection;