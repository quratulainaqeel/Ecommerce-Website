import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import SearchBar from '../Component/SearchBar'
import Cart from '../Component/Cart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import Navigationbar from '../Component/Navigationbar'

export default function AllProductsPage() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000http://localhost:4000/api/get-all-product").then((json) => setAllProducts(json.data.Product)).catch((err) => console.log(err))
  }, [])
  
  return (
    <>
      <div className=" bg-light">
        <div className="container pt-3 d-flex align-items-center ">

          <Link className='text-decoration-none d-flex' to={'/'}>
            <FontAwesomeIcon icon={faBagShopping} color='#dc3545' className='fs-2 pe-1' />
            <h2 className='text-danger '>Bonik</h2>
          </Link>

          <SearchBar />
          <Cart />
        </div>
      </div>
      <Navigationbar />

      {
        <div className="container">
          <div className="row">
            {allProducts.map((product, index) =>
              <div className="col-lg-3 col-md-4 col-sm-6 my-3" key={index}>
                <Card style={{ height: "370px" }}>
                  <Card.Img src={product.thumbnail} className='object-fit-contain  border rounded img-fluid' style={{ height: "200px" }} />

                  <span className="position-absolute translate-start badge bg-danger" style={{
                    padding: '5px 10px',
                    marginTop: '10px',
                    marginLeft: '-4px',
                    borderRadius: '4px'
                  }}>
                    {product.category.toUpperCase()}
                  </span>

                  <Card.Body>
                    <Link className='text-decoration-none text-dark' to={`/products/${product._id}`}>
                      <div className="brand text-center">
                        <span>Brand:  </span>
                        <span className="fw-semibold">{product.brand.length > 15 ? product.title.slice(0, 15) + '...' : product.brand}</span>
                      </div>

                      <div className="text-center">
                        {product.name.length > 20 ? product.name.slice(0, 20) + '...' : product.name}
                      </div>

                      <div className='text-center' >
                        <h5 className='text-danger fw-semibold  me-2 text-secondary'>${product.price}</h5>

                      </div>
                    <div className="d-grid">
                      <button className='btn btn-outline-danger px-5 py-2  '>Add to Cart</button>
                    </div>
                    </Link >

                  </Card.Body>
                </Card>

              </div>
            )}
          </div>
        </div>
      }
    </>
  )
}
