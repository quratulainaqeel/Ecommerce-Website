import { Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Home from './Pages/Home'
import CategoryProduct from './Pages/CategoryProduct'
import Page404 from './Pages/Page404'
import Navigationbar from './Components/Navigationbar'
import Footer from './Components/Footer'
import Product from './Pages/Product'
import AllProductsPage from './Pages/AllProductsPage'
import Searching from './Components/Searching'
import Cart from './Components/Cart'
import BrandProducts from './Pages/BrandProducts'
import BrandsPage from './Pages/BrandsPage'
import Cartitems from './Components/Cartitems'


function User() {
  return (
    <>
      <Searching />
      <Navigationbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/cartitems' element={<Cartitems />} />
        <Route path='/products/category/:CategoryName' element={<CategoryProduct />} />
        <Route path='/products/brand/:BrandName' element={<BrandProducts />} />
        <Route path='/products' element={<AllProductsPage />} />
        <Route path='/brands' element={<BrandsPage />} />
        <Route path='/products/:_id' element={<Product />} />
        <Route path='/page404' element={<Page404 />} />
        <Route path="/login" element={<Navigate to='/' replace={true} />} />
        <Route path="*" element={<Navigate to='/page404' replace={true} />} />
      </Routes>

      <Footer />
    </>
  )
}
export default User