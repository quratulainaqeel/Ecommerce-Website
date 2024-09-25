import React from 'react'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import {Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AllProductsPage from './Pages/AllProductsPage'

export default function Guest() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/allproducts" element={<AllProductsPage />} />
        <Route path="/logout" element={<Navigate to='/' replace={true} />} />
        <Route path="*" element={<Navigate to='/login' replace={true} />} />
      </Routes>
    </>
  )
}
