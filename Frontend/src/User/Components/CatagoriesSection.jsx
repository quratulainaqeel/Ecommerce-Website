import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, json } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

export default function CatagoriesSection() {

  const [categories, setcategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/get-all-category').then(json => setcategories(json.data.Category))
  }, [])

  return (
    <>
      <div className="container">
      <div>
        <div className="card bg-white my-2 rounded-0" style={{marginLeft : "-7px"}}>
          <div className="card-body">
            <h5 className="card-title text-danger">CATEGORIES</h5>
          </div>
        </div>
      </div>

        <div className="row">
          {
            categories?.map((val, key) =>

              <div className="col-lg-3 col-md-4 col-sm-6 my-3" key={key}>
                <Link className='text-decoration-none' to={`/products/category/${val.CategoryName}`}>
                  <Card>
                  <Card.Img src={val.CategoryImage} className='object-fit-contain border rounded img-fluid' style={{ height: "180px" }} />

                    <Card.Body>
                      <Card.Title className='fs-6 text-center'>{val.CategoryName.toUpperCase().replace('_', ' ')}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}
