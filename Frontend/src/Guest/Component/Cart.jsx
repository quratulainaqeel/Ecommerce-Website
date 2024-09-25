import React from 'react'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function Cart() {
    return (
       
            <div className='position-relative'>
                <FontAwesomeIcon icon={faCartShopping} color='black' className='fs-2' />
                <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                    0
                    <span className="visually-hidden">unread messages</span>
                </span>
            </div>
       
    )
}
