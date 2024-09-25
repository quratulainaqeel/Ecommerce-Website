import React, { useEffect, useState } from 'react'
import CategoryModal from '../Components/CategoryModal'
import axios from 'axios'
import PagesLoader from '../Components/PagesLoader'
import { RiDeleteBin6Line } from 'react-icons/ri'
import UpdateBrandModal from '../Components/UpdateBrandModal'
import BrandModal from '../Components/BrandModal'

export default function Brand() {

  const [brand, setbrand] = useState([])
  const [loader, setloader] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:4000/api/get-all-brand')
      .then((json) => {
        setbrand(json.data.Brand)
        setloader(false)
      })
      .catch((err) => console.log(err))
  }, [])

  const deleteCategory = (_id) => {
    axios.delete('http://localhost:4000/api/delete-brand', { data: { _id } })
      .then(json => {
        setbrand(json.data.Brand)
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      {
        loader ? <PagesLoader /> :
          <div className="container">
            <div className="rounded d-flex justify-content-between bg-light p-2 my-3 border border-danger">
              <span className='fs-4 fw-semibold text-dark'>Brand</span>
              <BrandModal recalldata={setbrand} />
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">BrandName</th>
                  <th scope="col">BrandImage</th>
                  <th scope="col">Actions</th>

                </tr>
              </thead>
              <tbody>
                {
                  brand.map((val, key) =>
                    <tr key={key} className='align-middle'>
                      <th scope="row">{key + 1}</th>
                      <td>{val.BrandName}</td>
                      <td><img src={val.BrandImage} alt="image" className='img-fluid' style={{ height: '5vh', objectFit: 'contain' }} /></td>
                      <td>
                        <div className="btn btn-danger" onClick={() => deleteCategory(val._id)}>
                          <RiDeleteBin6Line />
                        </div>
                        <UpdateBrandModal recalldata={setbrand} brandname={val.BrandName} />
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
