import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';
import { GlobalContext } from '../../Context/Context';
import { Cartcontext } from '../Context/AddToCart/context';


export default function Navigationbar() {

  const [showCategories, setShowCategories] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brand, setbrand] = useState([]);
  const { state, dispatch } = useContext(GlobalContext);
  const { cart_state, cart_dispatch } = useContext(Cartcontext);


  const handleCloseCategories = () => setShowCategories(false);
  const handleShowCategories = () => setShowCategories(true);

  const handleCloseBrands = () => setShowBrands(false);
  const handleShowBrands = () => setShowBrands(true);

  useEffect(() => {
    axios.get('http://localhost:4000/api/get-all-category').then(json => setCategories(json.data.Category));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:4000/api/get-all-brand').then(json => setbrand(json.data.Brand));
  }, []);


  const HandleLogout = () => {
    cart_dispatch({type: 'LOGOUT'})
    dispatch({ type: 'LOGOUT' })

    
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary  mb-2 " style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }} >
        <Container>
          <Navbar.Brand >
            <div>
              <Button variant="light" onClick={handleShowCategories} className="">
                <FontAwesomeIcon icon={faBorderAll} className='me-1' />
                Categories
              </Button>
              <Offcanvas show={showCategories} onHide={handleCloseCategories}>

                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>All Categories</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                  <div className="row">
                    {
                      categories.map((val, key) =>

                        <div key={key}>
                          <Link className='text-decoration-none text-dark' to={`/products/category/${val.CategoryName}`} onClick={handleCloseCategories}>
                            <li className=' list-group-item list-group-item-action'> {val.CategoryName.toUpperCase().replace('-', ' ')} <hr /></li>
                          </Link>
                        </div>
                      )
                    }
                  </div>

                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className='ms-auto '>
              <Link className='nav-link' to="/">Home</Link>
              <Link className='nav-link' to="/products">Products</Link>
              <Link className='nav-link' to="/brands">Brand</Link>
              <Link to={'/'}><div className='btn btn-dark ms-2' onClick={HandleLogout}>Logout</div></Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
