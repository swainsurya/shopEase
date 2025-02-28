import { CategoriesSection, Header, HeroSection, ProductSection } from '@/components'
import Footer from '@/components/component/Footer'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <CategoriesSection />
      <ProductSection sectionName={"Most Popular"}/>
      <ProductSection sectionName={"Newly Launched"}/>
      <ProductSection sectionName={"Featured Products"}/>
      <Footer />
    </div>
  )
}

export default Home
