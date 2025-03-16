import { ProductSection } from '@/components';
import { useUser } from '@/context/userContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SearchPage = () => {
    const {term} = useParams();
    const [searchedProducts, setSearchedProducts] = useState([])

    const searchFor = async() => {
        console.log(term)
        try {
            const req = await axios.post(`https://shopease-server-f7ke.onrender.com/api/product/product/q`,{term})
            console.log(req.data)
            const items = req.data.products;
            setSearchedProducts(items)
        } catch (error) {
            setSearchedProducts([])
        }
    }

    useEffect(()=>{
        searchFor()
    },[term])
  return (
    <div>
      <ProductSection sectionName={`Searched for ${term}`} products={searchedProducts} />
    </div>
  )
}

export default SearchPage
