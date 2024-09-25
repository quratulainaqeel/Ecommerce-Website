import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, json } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import PageLoaders from '../Components/PagesLoader';
import { BsFillCartFill } from 'react-icons/bs'
import { MdShoppingBasket } from 'react-icons/md'
import { FaDollarSign, FaUserAlt } from 'react-icons/fa'
import Chart from '../Components/Chart';

export default function Home() {

  const [loader, setloader] = useState(true)
  const [order, setorder] = useState([])
  const [Sales, setSales] = useState([])
  const [user, setuser] = useState([])
  const [product, setProduct] = useState([])


  useEffect(() => {
    axios.get('http://localhost:4000/api/get-all-order')
      .then((json) => {
        setorder(json.data.orders);
        setloader(false);

        const calculatedTotal = json.data.orders.reduce((accumulator, order) => accumulator + +order.totalBill, 0)
        setSales(calculatedTotal);
      })
      .catch((err) => console.log(err));

    axios.get('http://localhost:4000/api/get-all-product')
      .then((json) => {
        setProduct(json.data.Product)
      })
      .catch((err) => console.log(err))

    axios.get('http://localhost:4000/api/get-all-user')
      .then((json) => {
        setuser(json.data.User);


      })
      .catch((err) => console.log(err));

  }, []);


  return (
    <>
      {loader ? <PageLoaders /> :
        <div className="container row">

          <div className="col-lg-3 col-md-4 col-sm-6 mt-3" >
            <Card className='bg-success' style={{ backgroundColor: '#00c689' }}>
              <Card.Body>
                <Card.Title className='fs-6 text-white '>
                  <div className='d-flex justify-content-between'>
                    <p>TOTAL SALES </p>
                    <FaDollarSign className='fs-3 ' />
                  </div>
                  <h3> ${Sales}</h3>
                </Card.Title>
              </Card.Body>
            </Card>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6 mt-3" >
            <Card className='bg-primary' style={{ backgroundColor: '#3da5f4' }}>
              <Card.Body>
                <Card.Title className='fs-6 text-white '>
                  <div className='d-flex justify-content-between'>
                    <p>PRODUCT5 </p>
                    <MdShoppingBasket className='fs-3' />
                  </div>
                  <h3> {product.length}</h3>
                </Card.Title>
              </Card.Body>
            </Card>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6 mt-3" >
            <Card className='bg-danger' style={{ backgroundColor: '#f1536e' }}>
              <Card.Body>
                <Card.Title className='fs-6 text-white '>
                  <div className='d-flex justify-content-between'>
                    <p>ORDERS </p>
                    <BsFillCartFill className='fs-3' />
                  </div>
                  <h3> {order.length}</h3>
                </Card.Title>
              </Card.Body>
            </Card>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6 mt-3" >
            <Card className='bg-warning' style={{ backgroundColor: '#fe8119' }}>
              <Card.Body>
                <Card.Title className='fs-6 text-white '>
                  <div className='d-flex justify-content-between'>
                    <p>CUSTOMERS </p>
                    <FaUserAlt className='fs-3' />
                  </div>
                  <h3> {user.length}</h3>
                </Card.Title>
              </Card.Body>
            </Card>
          </div>

          <Chart orders={order}/>
        </div>
      }
    </>
  )
}
