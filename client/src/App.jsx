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
import { Toaster } from 'sonner'

const mode = localStorage.getItem("mode")

const App = () => {
  console.log(mode)
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  useEffect(() => {
    document.getElementsByTagName("main")[0].classList.add(`${mode}`)
  }, [])

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
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1B263B",
            color: "#FFFFFF",
            border: "1px solid #E0A800",
            boxShadow: "0px 4px 10px rgba(224, 168, 0, 0.3)",
          },
          success: {
            style: {
              background: "#E0A800",
              color: "#1B263B",
              fontWeight: "bold",
            },
          },
          error: {
            style: {
              background: "#D32F2F",
              color: "#FFFFFF",
            },
          },
        }}
      />

      <Footer />
    </>
  )
}

export default App