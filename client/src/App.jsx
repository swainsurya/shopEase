import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AllProducts, Home } from './pages'
import { Header } from './components'
import Footer from './components/component/Footer'

const App = () => {
  return (
    <>
      <Header />
      <main className='max-w-screen-2xl mx-auto'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
