import Button from 'react-bootstrap/Button';
import { Offcanvas } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { Cartcontext } from '../Context/AddToCart/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function Cart() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { cart_state, cart_dispatch } = useContext(Cartcontext)

  return (
    <>
      <Link to={'/cartitems'}>
          <div className='position-relative ms-1' onClick={handleShow}>
            <FontAwesomeIcon icon={faCartShopping} color='black' className='fs-2' />
            <span className="position-absolute translate-middle badge rounded-pill bg-danger">

              {cart_state?.cart?.length||0}

              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
      </Link>
    </>
  )
}
