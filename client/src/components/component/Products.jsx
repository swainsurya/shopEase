import React from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";



const ProductSection = ({ sectionName, products }) => {
    const location = useLocation();
    return (
        <section className="mt-8 flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-800 uppercase self-center">{sectionName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Link to={`/product/details/${product.id}`} key={product.id} className="shadow-md border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                        <CardContent className="p-4 flex items-center justify-around gap-6">
                            <img src={product.image} alt={product.name} className="h-full w-1/3 object-cover rounded-md" />
                            <div className="flex flex-1 flex-col h-full justify-between items-center w-1/2">
                                <div className="flex flex-col min-w-full h-1/2 mb-10">
                                    <h3 className="mt-2 font-semibold text-xl">{product.name}</h3>
                                    <p>{product.description}</p>
                                </div>
                                <p className="text-xl mb-4 font-bold self-start">Price: $ {product.price}</p>
                                <div className="flex items-center gap-5">
                                    {/* Quantity */}
                                    <div className="flex items-center">
                                        <span>Qty {1}</span>
                                        <ArrowUp size={20}/>
                                    </div>
                                    <Button className="mt-2 bg-blue-800 text-white shadow-md hover:bg-blue-700 w-[120px]">Add to Cart</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Link>
                ))}
            </div>
            {
                location.pathname == "/products" ?("") :(<Link to={"/products"} className="text-blue-700/70 mt-3 font-semibold flex gap-2 ">View More <ArrowRight/></Link>)
            }
        </section>
    );
};

export default ProductSection;