import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages'

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
