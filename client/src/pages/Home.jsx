import { CategoriesSection, Header, HeroSection, ProductSection } from '@/components'
import Footer from '@/components/component/Footer'
import React from 'react'
import products from '@/constants/products'

const showCaseProduct = products.slice(0,8)

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <CategoriesSection />
      <ProductSection sectionName={"Most Popular"} products={showCaseProduct}/>
      <ProductSection sectionName={"Newly Launched"} products={showCaseProduct}/>
      <ProductSection sectionName={"Featured Products"} products={showCaseProduct}/>
    </div>
  )
}

export default Home
