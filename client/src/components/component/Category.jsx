import React from "react";
import { Card, CardContent } from "../ui/card";
import products from "@/constants/products";


const CategoriesSection = () => {
  return (
    <section className="py-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800 uppercase text-center">Categories</h2>
      <div className="flex flex-1 items-center gap-3 overflow-x-scroll overflow-y-hidden noScroll_ch noscroll_all">
        {products.map((product) => (
          <Card key={product.id} className="text-center max-h-[50px] dark:bg-blue-900 w-fit flex items-center cursor-pointer">
            <CardContent className="w-full p-4 text-center">
              <p className="font-medium text-xl">{product.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
