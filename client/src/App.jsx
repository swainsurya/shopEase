import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AllProducts, Home, ProductDetailsPage } from './pages'
import { Header } from './components'
import Footer from './components/component/Footer'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ProfilePage from './pages/ProfilePage'
import OrderPage from './pages/OrderPage'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const App = () => {

  const {pathname} = useLocation()
  useEffect(()=>{
    window.scrollTo(0,0);
  },[pathname])

  return (
    <>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} className="absolute inset-0">
        <Header />
        <main className='max-w-screen-2xl mx-auto min-h-screen'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<AllProducts />} />
            <Route path='/product/details/:id' element={<ProductDetailsPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/check-out' element={<CheckoutPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/order' element={<OrderPage />} />
          </Routes>
        </main>
      </ClerkProvider>
      <Footer />
    </>
  )
}

export default App