import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample banners data
const sampleBanners = [
  { text: "Welcome to ShopEase", subtext: "Discover the best deals", imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { text: "New Arrivals", subtext: "Shop the latest trends", imageUrl: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { text: "Limited Offers", subtext: "Hurry before they're gone!", imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

const HeroSection = () => {
  // State for current banner and banner list
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = sampleBanners;

  // Function to go to the previous banner
  const prevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Function to go to the next banner
  const nextBanner = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  // Automatically change the banner every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextBanner();
    }, 2000); // Change banner every 2 seconds

    // Clean up the interval on component unmount or whenever the effect is rerun
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <section className="w-full h-[300px] md:h-[750px] bg-gradient-to-r from-blue-200 to-indigo-900 flex items-center justify-center text-white text-center relative overflow-hidden">
      {/* Banner Image */}
      <img
        src={banners[currentBanner].imageUrl}
        alt="Banner"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
      />
      
      {/* Navigation Buttons */}
      {/* Prev Button */}
      <ChevronLeft size={44} onClick={prevBanner} className="absolute left-4 text-white cursor-pointer" />
      
      {/* Content */}
      <div className="relative z-10">
        <h2 className=" text-2xl md:text-4xl font-bold">{banners[currentBanner].text}</h2>
        <p className="mt-2 text-lg md:text-xl">{banners[currentBanner].subtext}</p>
        <Button className="mt-10 md:mt-4 bg-white text-blue-800 border border-white shadow-md hover:bg-blue-800 hover:text-white">Shop Now</Button>
      </div>
      
      {/* Next Button */}
      <ChevronRight size={44} onClick={nextBanner} className="absolute right-4 text-white cursor-pointer"/>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 flex space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer ${currentBanner === index ? 'bg-white' : 'bg-gray-400'}`}
            onClick={() => setCurrentBanner(index)}  // Allow dot navigation to jump to a specific banner
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
