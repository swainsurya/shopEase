import { CategoriesSection, ProductSection } from '@/components'
import React from 'react'
import products from '@/constants/products'
import Footer from '@/components/component/Footer'

const AllProducts = () => {
  return (
    <div>
        <CategoriesSection />
        <ProductSection sectionName={"All Products"} products={products}/>
    </div>
  )
}

export default AllProducts
