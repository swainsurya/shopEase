import { CategoriesSection, HeroSection, ProductSection } from '@/components'
import { useUser } from '@/context/userContext'
import React, { useState } from 'react'

const Home = () => {
  const {getProducts} = useUser()
  const newLaunchedProduct =  getProducts.slice(0,8)
  const mostPopular = getProducts.slice(2,9)
  const featuredProducts = getProducts.slice(3,10)

  return (
    <div>
      <HeroSection/>
      <CategoriesSection />
      <ProductSection sectionName={"Most Popular"} products={newLaunchedProduct}/>
      <ProductSection sectionName={"Newly Launched"} products={mostPopular}/>
      <ProductSection sectionName={"Featured Products"} products={featuredProducts}/>
    </div>
  )
}

export default Home
