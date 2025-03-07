import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { UserProvider } from './context/userContext'
import Loading from './components/component/Loading'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <Loading>
        <App />
      </Loading>
    </UserProvider>
  </BrowserRouter>
)
