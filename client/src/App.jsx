import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AllProducts, Home, ProductDetailsPage } from './pages'
import { Header } from './components'
import Footer from './components/component/Footer'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ProfilePage from './pages/ProfilePage'
import OrderPage from './pages/OrderPage'
import LoginPage from './pages/LoginPage'

const mode = localStorage.getItem("mode")

const App = () => {
  console.log(mode)
  const {pathname} = useLocation()
  useEffect(()=>{
    window.scrollTo(0,0);
  },[pathname])

  useEffect(()=>{
    document.getElementsByTagName("main")[0].classList.add(`${mode}`)
  },[])

  return (
    <>
        <Header />
        <main className={`mx-auto min-h-screen`}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<AllProducts />} />
            <Route path='/product/details/:id' element={<ProductDetailsPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/check-out' element={<CheckoutPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/order' element={<OrderPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </main>
      <Footer />
    </>
  )
}

export default App