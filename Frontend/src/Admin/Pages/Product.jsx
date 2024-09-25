import React, { useEffect, useState } from 'react'
import ProductModal from '../Components/ProductModal'
import axios from 'axios'
import PagesLoader from '../Components/PagesLoader'
import { RiDeleteBin6Line } from 'react-icons/ri'
import UpdateProductModal from '../Components/UpdateProductModal'


export default function Product() {

  const [product, setProduct] = useState([])
  const [loader, setloader] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:4000/api/get-all-product')
      .then((json) => {
        setProduct(json.data.Product)
        setloader(false)
      })
      .catch((err) => console.log(err))
  }, [])

  const deleteProduct = (_id) => {
    axios.delete('http://localhost:4000/api/delete-product', { data: { _id } })
      .then(json => {
        setProduct(json.data.Product)
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      {
        loader ? <PagesLoader /> :
          <div className="container">
            <div className="rounded d-flex justify-content-between bg-light p-2 my-3 border border-danger">
              <span className='fs-4 fw-semibold text-dark'>Products</span>
              <ProductModal recalldata={setProduct} />

            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Categoey</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Actions</th>


                </tr>
              </thead>
              <tbody>
                {
                  product.map((val, key) =>
                    <tr key={key}  className='align-middle'>
                      <td><img src={val.thumbnail} alt="image" className='img-fluid rounded-circle border border-secondary' style={{ height: '10vh', aspectRatio: 1 / 1, objectFit: 'contain' }} /></td>
                      <td >{val.name.length > 20 ? val.name.slice(0, 20) + '...' : val.name}</td>
                      <td>{val.description.length > 20 ? val.description.slice(0, 20) + '...' : val.description}</td>
                      <td>{val.price}</td>
                      <td>{val.category}</td>
                      <td>{val.brand}</td>
                      <td><div className="btn btn-danger" onClick={() => deleteProduct(val._id)}>
                        <RiDeleteBin6Line />
                      </div>
                        <UpdateProductModal recalldata={setProduct} productid={val._id} PRODUCT={val} />
                      </td>
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