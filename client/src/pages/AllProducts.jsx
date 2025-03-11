import { CategoriesSection, ProductSection } from '@/components'
import { useUser } from '@/context/userContext'
import React, { useEffect, useState } from 'react'

const AllProducts = () => {
  const { getProducts, isProductAdded } = useUser()
  const [products, setProducts] = useState(getProducts || [])

  useEffect(()=>{
    setProducts(getProducts)
  },[getProducts])
  return (
    <div>
        <CategoriesSection />
        <ProductSection sectionName={"All Products"} products={products}/>
    </div>
  )
}

export default AllProducts
