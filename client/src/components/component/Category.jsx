import React from "react";
import { Card, CardContent } from "../ui/card";


const CategoriesSection = () => {
  return (
    <section className="py-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Categories</h2>
      <div className="flex flex-1 items-center gap-3 overflow-x-scroll overflow-y-hidden noScroll_ch noscroll_all">
        {["Electronics", "Fashion", "Home & Kitchen", "Beauty & Health", "Sports", "Toys", "Automotive", "Books", "Groceries", "Furniture"].map((category, index) => (
          <Card key={index} className="text-center h-[30px] w-fit">
            <CardContent className="w-full">
              <p className="font-medium text-blue-900 text-xl">{category}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
