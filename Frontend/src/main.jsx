import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ScrollToTop from './ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Toaster />
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
  // {/* </StrictMode>, */}
)
