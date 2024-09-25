import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../Component/SearchBar'
import Cart from '../Component/Cart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import Navigationbar from '../Component/Navigationbar'
import Footer from '../Component/Footer'
import HeaderSection from '../Component/HeaderSection'
import CategorySection from '../Component/CategorySection'
import BrandSection from '../Component/BrandSection'


export default function Home() {
  return (

    <div className="bg-light sticky-top  ">
      <div className="container pt-3 d-flex align-items-center ">

        <Link className='text-decoration-none d-flex' to={'/'}>
          <FontAwesomeIcon icon={faBagShopping} color='#dc3545' className='fs-2 pe-1' />
          <h2 className='text-danger '>Bonik</h2>
        </Link>

        <SearchBar />
        <div className='d-flex align-items-center'>
          <img src="https://firebasestorage.googleapis.com/v0/b/cosmetics-api-storage-941af.appspot.com/o/user.png?alt=media&token=4eef9d27-fbb7-4db5-9e61-36026dd9b8d5" alt="user" width={45} height={45} onClick={() => setShow(true)} className='rounded-circle me-2 object-fit-cover' />
       
        </div>
        <Cart />
      </div>
      <Navigationbar />
      <HeaderSection />
      <BrandSection />
      <CategorySection />
      <Footer />

    </div>
  )
}
