import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link, json } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Cartcontext } from '../Context/AddToCart/context';
import Loader from '../Components/loader';

export default function SearchingModal() {

    const { cart_state, cart_dispatch } = useContext(Cartcontext)
    const [search, setsearch] = useState("")
    const [products, setproducts] = useState([])
    const [loader, setloader] = useState(true)

    const [modalShow, setModalShow] = React.useState(false);

    const hideModal = () => {
        setModalShow(false);
    };

    const Handlesearching = () => {
        axios.get(`http://localhost:4000/api/get-product-by-search/${search}`).then(json => setproducts(json.data.Product))
        setModalShow(true);
        setloader(false)
    }

    const AddToCart = (item) => {

        const payload = {
            ...item,
            Quantity: 1,
        }

        cart_dispatch(
            {
                type: "ADD_TO_CART",
                payload
            }
        )
    }

    return (
        <>
            <div className="container " >
                <InputGroup size="default" >
                    <Form.Control
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder='Search your preferred items here'
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                    />
                    <InputGroup.Text>
                        <button className='bg-light' style={{ border: 'none' }} onClick={Handlesearching}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} color='#dc3545' className='fs-3' />
                        </button>
                    </InputGroup.Text>
                </InputGroup>
            </div>

            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={hideModal}
                fullscreen={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        SEARCHING RESULTS
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-light'>
                    {
                        loader ? <Loader /> :
                            products.length > 0 ?
                                (
                                    <div className="container">
                                        <div className="row">
                                            {products.map((val, key) =>

                                                <div className="col-lg-3 col-md-4 col-sm-6 my-3" key={key} >

                                                    <Card style={{ height: "360px" }}>
                                                        <Card.Img varient="top" src={val.thumbnail} className='object-fit-contain border rounded img-fluid' style={{ height: "200px" }} />
                                                        <Card.Body>
                                                            <Link className='text-decoration-none text-dark' to={`/products/${val._id}`} onClick={hideModal}>
                                                                <div className="brand text-center">
                                                                </div>

                                                                <div className="brand text-center">
                                                                    <span>Brand:  </span>
                                                                    <span className="fw-semibold">{val.brand.length > 15 ? val.title.slice(0, 15) + '...' : val.brand}</span>
                                                                </div>

                                                                <div className="text-center">
                                                                    {val.name.length > 20 ? val.name.slice(0, 20) + '...' : val.name}
                                                                </div>

                                                                <div className='text-center' >
                                                                    <h5 className='text-danger fw-semibold  me-2 text-secondary'>${val.price}</h5>

                                                                </div>
                                                            </Link>

                                                            <div className="d-grid">
                                                                <button className='btn btn-outline-danger px-5 py-2' disabled={cart_state.cart.some(item => item._id === val._id)} onClick={() => AddToCart(val)}>Add to Cart</button>
                                                            </div>
                                                        </Card.Body>

                                                        <span className="position-absolute translate-start badge bg-danger" style={{
                                                            padding: '5px 10px',
                                                            marginTop: '10px',
                                                            marginLeft: '-4px',
                                                            borderRadius: '4px'
                                                        }}>
                                                            {val.category.toUpperCase()}
                                                        </span>


                                                    </Card>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                                : (<h1 className='text-danger text-center '>Not found</h1>)
                    }

                </Modal.Body>

            </Modal>
        </>
    );
}
