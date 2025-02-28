import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import products from '@/constants/products';
import { ProductSection } from '@/components';
import { Button } from '@/components/ui/button';
import CommentSection from '@/components/component/CommentSection';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id == id);
    const similarProducts = products.slice(0, 8);
    
    return (
        <div className="mt-5 md:mt-10 px-4">
            {/* Product Details Section */}
            <div className="w-full flex flex-col md:flex-row items-center gap-10 bg-gray-100 p-6 rounded-lg shadow-lg">
                {/* Product Image Section */}
                <div className="md:w-1/2 w-full flex flex-col items-center">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full md:h-[450px] object-contain rounded-lg shadow-md"
                    />
                    <div className="w-full flex justify-between mt-4 gap-2">
                        {[...Array(3)].map((_, index) => (
                            <img 
                                key={index} 
                                src={product.image} 
                                alt="Thumbnail" 
                                className="w-1/3 h-24 object-contain rounded-md cursor-pointer border hover:border-black p-1 transition-all duration-300 hover:scale-105"
                            />
                        ))}
                    </div>
                </div>

                {/* Product Info Section */}
                <div className="md:w-1/2 w-full flex flex-col gap-6">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800">{product.name}</h1>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">{product.description}</p>
                    <div className="text-2xl md:text-3xl font-semibold text-gray-900">
                        Price: <span className="text-green-600">${product.price}</span> <span className="text-red-600 line-through">${(product.price * 1.21).toFixed(2)}</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Button className="bg-blue-800 text-white shadow-md hover:bg-blue-700 h-[50px] w-full md:w-[180px] text-lg font-medium transition-all duration-300 hover:scale-105">
                            Add to Cart
                        </Button>
                        <Button className="bg-red-700 text-white shadow-md hover:bg-red-600 h-[50px] w-full md:w-[180px] text-lg font-medium transition-all duration-300 hover:scale-105">
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>

            {/* Similar Products Section */}
            <ProductSection sectionName="Similar Products" products={similarProducts} />

            {/* Comment Section */}
            <CommentSection />
        </div>
    );
};

export default ProductDetailsPage;