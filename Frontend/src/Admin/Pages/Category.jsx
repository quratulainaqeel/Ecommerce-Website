import React, { useEffect, useState } from 'react'
import CategoryModal from '../Components/CategoryModal'
import axios from 'axios'
import PagesLoader from '../Components/PagesLoader'
import { RiDeleteBin6Line } from 'react-icons/ri'
import UpdateModal from '../Components/UpdateCategoryModal'

export default function Category() {

  const [category, setcategory] = useState([])
  const [loader, setloader] = useState(true)
 
  useEffect(() => {
    axios.get('http://localhost:4000/api/get-all-category')
      .then((json) => {
        setcategory(json.data.Category)
        setloader(false)
      })
      .catch((err) => console.log(err))
  }, [])

  const deleteCategory = (_id) => {
    axios.delete('http://localhost:4000/api/delete-category', { data: { _id } })
      .then(json => {
        setcategory(json.data.Category)
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      {
        loader ? <PagesLoader /> :
          <div className="container">
            <div className="rounded d-flex justify-content-between bg-light p-2 my-3 border border-danger">
              <span className='fs-4 fw-semibold text-dark'>Category</span>
              <CategoryModal recalldata={setcategory} />
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">CategoryName</th>
                  <th scope="col">CategoryImage</th>
                  <th scope="col">Actions</th>

                </tr>
              </thead>
              <tbody>
                {
                  category.map((val, key) =>
                    <tr key={key} className='align-middle'>
                      <th scope="row">{key + 1}</th>
                      <td>{val.CategoryName}</td>
                      <td><img src={val.CategoryImage} alt="image"className='img-fluid rounded-circle border border-secondary' style={{ height: '10vh', aspectRatio: 1 / 1, objectFit: 'cover' }}/></td>
                      <td>
                        <div className="btn btn-danger" onClick={() => deleteCategory(val._id)}>
                          <RiDeleteBin6Line />
                        </div>
                        <UpdateModal recalldata={setcategory} categoryname={val.CategoryName} />

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