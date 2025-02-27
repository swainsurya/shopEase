import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <main className='max-w-screen mx-auto px-2'>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </main>
  )
}

export default App
