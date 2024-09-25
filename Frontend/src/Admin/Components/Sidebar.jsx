import React, { useEffect } from 'react'
import { FiHome } from 'react-icons/fi'
import { MdProductionQuantityLimits, MdOutlineShoppingBasket } from 'react-icons/md'
import { BiCategory } from 'react-icons/bi'
import { TbBrandItch } from 'react-icons/tb'
import { BsCart3 } from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'
import {  FaRegUser } from 'react-icons/fa'


export default function Sidebar() {

  const location = useLocation()

  const NavItems = [
    {
      tab: "Home",
      url: "/",
      icon: <FiHome />,
    },
    {
      tab: "Category",
      url: "/category",
      icon: <BiCategory />
    },
    {
      tab: "Brands",
      url: "/brand",
      icon: <TbBrandItch />
    },
    {
      tab: "Products",
      url: "/product",
      icon: <MdOutlineShoppingBasket />
    },
    {
      tab: "Orders",
      url: "/orders",
      icon: <BsCart3 />
    },
    {
      tab: "Customers",
      url: "/customers",
      icon: <FaRegUser />
    }
  ]

  return (
    <>
      <div className="d-flex justify-content-between">
        <span className='text-light fs-3 mt-3 ms-3'>Admin</span>
      </div>
      <ul className="nav flex-column mt-3">
        {
          NavItems.map((val, key) =>

            <li className={`nav-item p-2 ${location.pathname == val.url ? 'bg-danger rounded' : null}`} key={key}>
              <Link className="nav-link text-white d-flex align-items-center gap-2 " to={val.url}>
                {val.icon}
                <span className="d-none d-sm-inline">{val.tab}</span>
              </Link>
            </li>
          )}
      </ul>
    </>
  )
}