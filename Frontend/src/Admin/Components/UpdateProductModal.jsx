import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ModalLoader from './ModalLoader';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AiOutlineEdit } from 'react-icons/ai'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


export default function UpdateProductModal({ recalldata, productid, PRODUCT }) {
    const [show, setShow] = useState(false);
    const [ProductName, setProductName] = useState('')
    const [thumbnail, sethumbnail] = useState(null)
    const [loader, setloader] = useState(false)
    const [brand, setbrand] = useState([])
    const [category, setcategory] = useState([])
    const [price, setPrice] = useState(0)
    const [description, setdescription] = useState("")
    const [images, setimages] = useState([])

    const [BrandVal, setBrandVal] = useState([])
    const [CategoryVal, setCategoryVal] = useState([])

    const handleClose = () => setShow(false);

    const handleShow = () => {

        setProductName(PRODUCT.name)
        setPrice(PRODUCT.price)
        setbrand(PRODUCT.brand)
        setcategory(PRODUCT.category)
        setdescription(PRODUCT.description)

        axios.get('http://localhost:4000/api/get-all-brand').then((json) => {
            setBrandVal(json.data.Brand)

        })
            .catch((err) => console.log(err))

        axios.get('http://localhost:4000/api/get-all-category')
            .then((json) => {
                setCategoryVal(json.data.Category)
                setShow(true)
            })
            .catch((err) => console.log(err))

    }

    const urls = [];

    const MultipleImagesUpload = () => images?.map((Val) => {
        const MultipleImageRef = ref(storage, `Images/Product/${ProductName}/${Val.name}`);
        return uploadBytes(MultipleImageRef, Val).then((snapshot) => {
            return getDownloadURL(snapshot.ref).then((url) => {
                urls.push(url)

            })
                .catch((error) => console.log(error));
        });
    }
    )

    const UpdateProduct = (e) => {
        e.preventDefault();

        const UploadImages = MultipleImagesUpload()

        Promise.all(UploadImages)
            .then(() => {
                const storageRef = ref(storage, `Images/Product/${ProductName}/${thumbnail.name}`);
                uploadBytes(storageRef, thumbnail).then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            const payload = {
                                _id: productid,
                                name: ProductName,
                                brand,
                                category,
                                price,
                                images: urls,
                                thumbnail: url,
                                description: description,
                                rating: 0
                            }

                            axios.put('http://localhost:4000/api/update-product', payload).then((json) => {
                                recalldata(json.data.Product)
                                setloader(false)
                                handleClose()
                                Swal.fire({
                                    title: "Product Updated Successfully!",
                                    text: "The product has been updated successfully.",
                                    icon: "success",
                                    confirmButtonText: "OK"
                                });
                            })
                                .catch((err) => console.log(err))

                        })
                        .catch((error) => console.log(error));
                });
            })
    }
    return (
        <>
            <div className="btn btn-dark ms-1" onClick={handleShow}> <AiOutlineEdit />
            </div>

            <Modal show={show} onHide={handleClose} centered backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={UpdateProduct}>


                        <div className="row">
                            <div className="col">
                                <FloatingLabel controlId="productname" label="Product Name" className="mb-3 text-secondary"                                >
                                    <Form.Control type="text" placeholder="Product Name" value={ProductName} onChange={(e) => setProductName(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="col">
                                <FloatingLabel controlId="price" label="Product Price ($)" className="mb-3 text-secondary"                                >
                                    <Form.Control type="number" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </FloatingLabel>
                            </div>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="thumbnail" className="form-label">
                                Product Thumbnail
                            </label>
                            <input className="form-control" onChange={(e) => sethumbnail(e.target.files[0])} type="file" id="thumbnail" />
                        </div>

                        <div className="mb-3">

                            <p className='mb-0 fw-semibold'>Choose Images</p>
                            <small className="text-secondary">Double Click to Delete Images</small>
                            <div className="mt-2 d-flex gap-2 align-items-center">
                                {
                                    images.map((val, key) =>
                                        <div key={key} className="bg-light border rounded col-md-1"
                                            onDoubleClick={() => setimages(images.filter((img) => img != val))}>
                                            <img style={{ height: '10vh', cursor: 'pointer', objectFit: 'contain' }}
                                                className='img-fluid' src={URL.createObjectURL(val)} alt="" />
                                        </div>)
                                }
                                <label htmlFor="formFile" style={{ height: '10vh', cursor: 'pointer' }} className="col-md-1 d-flex border border-dark border-2 justify-content-center align-items-center rounded  fs-3 fw-bold form-label">
                                    +
                                </label>
                            </div>

                            <input className="form-control d-none" type="file" id="formFile" onChange={(e) => setimages([...images, e.target.files[0]])} />
                        </div>


                        <div className="row">
                            <div className="col">
                                <Form.Group className="mb-3" >

                                    <FloatingLabel controlId="floatingSelectBrand" label="Select Brand">
                                        <Form.Select aria-label="Please Select a Brand" onChange={(e) => setbrand(e.target.value)}>
                                            <option>Please Select a Brand</option>
                                            {
                                                BrandVal.map((val, key) => <option key={key} value={val.BrandName}>{val.BrandName}</option>)
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Group className="mb-3" >
                                    <FloatingLabel controlId="selectCategory" label="Select Category">
                                        <Form.Select aria-label="Please Select a Category" onChange={(e) => setcategory(e.target.value)}>
                                            <option>Please Select a Category</option>
                                            {
                                                CategoryVal.map((val, key) => <option key={key} value={val.CategoryName}>{val.CategoryName}</option>)
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>
                            </div>
                        </div>


                        <FloatingLabel controlId="floatingTextarea2" label="Description" className='mb-3'>
                            <Form.Control
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-danger px-5 py-2  ">
                                Update
                            </button>
                        </div>
                    </form>
                    {loader ? <ModalLoader /> : null}

                </Modal.Body>

            </Modal>
        </>
    )
}
