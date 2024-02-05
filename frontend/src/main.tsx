import React from 'react'
import ReactDOM from 'react-dom/client'
import ProductPage from './pages/ProductPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Header from './components/core/Header'
import Footer from './components/core/Footer'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductPage />
  }
])



ReactDOM.createRoot(document.getElementById('root')!).render(
  // FIX: With React.StrictMode the pages was rendering 2 times
  // <React.StrictMode>
  <div className="grid bg-slate-100 w-screen h-screen items-center shadow-sm font-sans">
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </div>
  // </React.StrictMode>,
)
