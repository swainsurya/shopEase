import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AllProducts, Home, ProductDetailsPage } from './pages'
import { Header } from './components'
import Footer from './components/component/Footer'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

const App = () => {
  return (
    <>
      <Header />
      <main className='max-w-screen-2xl mx-auto min-h-screen'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/product/details/:id' element={<ProductDetailsPage/>} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/check-out' element={<CheckoutPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
