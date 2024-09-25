import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Sidebar from './Components/Sidebar'
import Home from './Pages/Home'
import Category from './Pages/Category'
import Brand from './Pages/Brand'
import Product from './Pages/Product'
import Customer from './Pages/Customer.jsx'
import Navigationbar from './Components/Navigationbar'
import Orders from './Pages/Orders'


export default function Admin() {
  return (
    <>

      <div className="row m-0">
        <div className="col-md-3 bg-dark position-fixed vh-100 m-0, p-0" style={{ overflow: 'auto' }}>
          <Sidebar />
        </div>

        <div className="col-md-9 offset-md-3 p-0" style={{ overflow: 'auto' }}>
          <div className="pl-3 pt-3">
            <Navigationbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category" element={<Category />} />
              <Route path="/brand" element={<Brand />} />
              <Route path="/product" element={<Product />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customer />} />
              <Route path="/logout" element={<Navigate to='/' replace={true} />} />
              <Route path="*" element={<Navigate to='/' replace={true}/> } />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}