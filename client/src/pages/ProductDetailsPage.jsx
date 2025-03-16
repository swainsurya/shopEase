import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '@/constants/products';
import { ProductSection } from '@/components';
import { Button } from '@/components/ui/button';
import CommentSection from '@/components/component/CommentSection';
import { useUser } from '@/context/userContext';
import axios from 'axios';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const {getProducts} = useUser()
    const [product , setProduct] = useState(null)
    const similarProducts = getProducts.slice(2, 10);

    // get product by id 
    const getProductById = async() => {
        const req = await axios.get(`https://shopease-server-f7ke.onrender.com/api/product/product/${id}`)
        const item = req.data.product
        setProduct(item)
    }
    useEffect(()=>{ getProductById() },[id])

    // State for modal
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="py-5 md:py-10 px-4">
            {/* Product Details Section */}
            <div className="w-full flex flex-col md:flex-row items-center gap-10 p-6 rounded-lg shadow-lg">
                {/* Product Image Section */}
                <div className="md:w-1/2 w-full flex flex-col items-center">
                    <img 
                        src={product?.image} 
                        alt={product?.name} 
                        className="w-full md:h-[450px] object-contain rounded-lg shadow-md cursor-pointer"
                        onClick={() => setSelectedImage(product?.image)}
                    />
                    <div className="w-full flex justify-between mt-4 gap-2">
                        {[...Array(3)].map((_, index) => (
                            <img 
                                key={index} 
                                src={product?.image} 
                                alt="Thumbnail" 
                                className="w-1/3 h-24 object-contain rounded-md cursor-pointer border hover:dark:border-white hover:border-black p-1 transition-all duration-300 hover:scale-105"
                                onClick={() => setSelectedImage(product?.image)}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Info Section */}
                <div className="md:w-1/2 w-full flex flex-col gap-6">
                    <h1 className="text-3xl md:text-5xl font-bold">{product?.name}</h1>
                    <p className="text-lg md:text-xl leading-relaxed">{product?.description}</p>
                    <div className="text-2xl md:text-3xl font-semibold">
                        Price: <span className="text-green-600 mr-4">${product?.price}</span> 
                        <span className="text-red-600 line-through">${(product?.price * 1.21).toFixed(2)}</span>
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
            <CommentSection productId={id} product={product} />

            {/* Modal for Large Image */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="relative p-5">
                        <button 
                            className="absolute top-2 right-2 text-white text-3xl font-bold"
                            onClick={() => setSelectedImage(null)}
                        >
                            &times;
                        </button>
                        <img 
                            src={selectedImage} 
                            alt="Large Preview" 
                            className="max-h-[80vh] max-w-[70vw] md:h-[60vh] rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsPage;
