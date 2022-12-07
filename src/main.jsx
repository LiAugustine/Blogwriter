import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import { BrowserRouter } from "react-router-dom"
import { NextUIProvider } from '@nextui-org/react';
import { GoogleOAuthProvider } from '@react-oauth/google'
import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </NextUIProvider>
)
