import React from 'react'
import { AiFillFacebook, AiOutlineInstagram, AiFillLinkedin } from 'react-icons/ai'
import { FaTwitter } from 'react-icons/fa'
import { BiLogoInstagramAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <>
      <footer
        className=" text-center text-white py-5 bg-dark mt-3 W-100">
        <h1 className="card-title pb-3 text-WHITE fw-bold">
          Bonik.
        </h1>
        <em className="card-text" >
        Explore fashion trends and elevate your style with Bonik's curated collections.
        </em>

        <div className="my-3"
          data-aos-duration="2000">
          <Link to='https://www.facebook.com/' >  <AiFillFacebook className='fs-2 mx-1 ' color='#fff' /></Link>
          <Link to='https://twitter.com/'><FaTwitter className='fs-2 mx-1' color='#fff' /></Link>
          <Link to="https://www.instagram.com/"><BiLogoInstagramAlt className="fs-2 mx-1" color="#fff" /></Link>
          <Link to='https://www.linkedin.com/'><AiFillLinkedin className='fs-2 mx-1' color='#fff' /></Link>
        </div>

        <div >
          <div className="row">
            <div>
              <small>© Copyright Bonik. All Rights Reserved</small>
            </div>
            <div>
              <small>
                Designed by <span className="text-danger"> Quratulain</span>
              </small>
            </div>
          </div>
        </div>
      </footer>
 
    </>
  )
}
