import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, json } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { BiCategoryAlt } from 'react-icons/bi'

export default function CategorySection() {

    const [categories, setcategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/get-all-category').then(json => setcategories(json.data.Category))
    }, [])

    return (
        <div className="container">
            <div>
                <div className="card bg-white my-3 rounded-0">
                    <div className="card-body d-flex">
                        <BiCategoryAlt color='#dc3545' className='fs-4 me-2' />
                        <h5 className="card-title text-danger">CATEGORIES</h5>
                    </div>
                </div>
            </div>

            <div className="row">
                {
                    categories?.map((val, key) =>

                        <div className="col-md-3 col-sm-4 my-1" key={key}>
                            <Link className='text-decoration-none' to={'/login'}>
                                <Card className='r'>
                                    <Card.Img src={val.CategoryImage} className=' object-fit-contain border rounded img-fluid' style={{ height: "180px" }} />

                                    <Card.Body>
                                        <Card.Title className='fs-6  text-center'>{val.CategoryName.toUpperCase().replace('-', ' ')}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
