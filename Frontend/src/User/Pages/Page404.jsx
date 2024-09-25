import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceAngry } from '@fortawesome/free-solid-svg-icons'
export default function Page404() {
  return (
   <>
   <div className=" mt-5  bg-light py-3 text-center">
    <FontAwesomeIcon icon={faFaceAngry} color='#dc3545'  className='fs-1' />
   <div className=' text-gray fs-1 fw-bold'>404</div>
   <p className='text-secondary fs-5'>Page not found</p>
   
   </div>
   </>
  )
}
