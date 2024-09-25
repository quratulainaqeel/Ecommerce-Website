import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PagesLoader from '../Components/PagesLoader'
import UpdateOrderModal from '../Components/UpdateOrderModal'

export default function Orders() {
  const [order, setorder] = useState([])
  const [loader, setloader] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:4000/api/get-all-order')
      .then((json) => {
        setorder(json.data.orders)
        setloader(false)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      {
        loader ? <PagesLoader /> :
          <div className="container">
            <div className="rounded d-flex justify-content-between bg-light p-2 my-3 border border-danger">
              <span className='fs-4 fw-semibold text-dark'>Order Details</span>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">CustomerName</th>
                  <th scope="col">Tracking_ID</th>
                  <th scope="col">Status</th>
                  <th scope="col">Total</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                {
                  order.map((val, key) =>
                    <tr key={key} className='align-middle'>
                      <th scope="row">{key + 1}</th>
                      <td>{val.customerName}</td>
                      <td>{val._id}</td>
                      <td>{val.status}</td>
                      <td>{val.totalBill}</td>
                      <td><UpdateOrderModal recalldata={setorder} order={val._id} orderStatus={val.status} /></td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
      }
    </>
  )
}