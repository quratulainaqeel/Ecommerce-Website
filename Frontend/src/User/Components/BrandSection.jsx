import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, json } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

export default function BrandSection() {

    const [brand, setbrand] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/get-all-brand').then(json => setbrand(json.data.Brand))
    }, [])

    if (!brand) {
        setloader(false)
    }
    return (
        <>
            <div className="row">
                {
                    brand?.map((val, key) =>

                        <div className="col-lg-3 col-md-4 col-sm-6 my-3" key={key}>
                            <Link className='text-decoration-none' to={`/products/brand/${val.BrandName}`}>
                                <Card>
                                    <Card.Img src={val.BrandImage} className='object-fit-contain border rounded img-fluid' style={{ height: "180px" }} />

                                    <Card.Body>
                                        <Card.Title className='fs-6 text-center'>{val.BrandName.toUpperCase().replace('-', ' ')}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                    )
                }
            </div>
           
        </>
    )
}
