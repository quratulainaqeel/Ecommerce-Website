import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ModalLoader from './ModalLoader';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function BrandModal({recalldata}) {
    const [show, setShow] = useState(false);
    const [BrandName, setBrandName] = useState('')
    const [BrandImage, setBrandImage] = useState(null)
    const [loader, setloader] = useState(false)

    const handleClose = () => {
        setShow(false);
        setBrandName("");
    }
    const handleShow = () => setShow(true)

    const AddBrand = (e) => {
        e.preventDefault();
        setloader(true)

        const storageRef = ref(storage, `Images/Brand/${BrandImage.name}`);
        uploadBytes(storageRef, BrandImage).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    const payload = {
                        BrandName,
                        BrandImage: url
                    }
                    const URL = 'http://localhost:4000/api/create-brand '

                    axios.post(URL, payload).then((json) => {
                        recalldata(json.data.Brand)
                        setloader(false)
                        handleClose()
                        Swal.fire({
                            title: "Product Added Successfully!",
                            text: "Your new product has been added successfully.",
                            icon: "success",
                            confirmButtonText: "OK"
                        });
                    }
                    )
                        .catch((err) => console.log(err))



                })
                .catch((error) => {
                    console.log(error)
                    setloader(false)
                });
        });
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                <div>Add Brand</div>
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={AddBrand}>
                        <div className="mb-3">
                            <label htmlFor="Brand Name" className="form-label">
                                Brand Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="Brand Name"
                                aria-describedby="emailHelp"
                                value={BrandName}
                                onChange={(e) => setBrandName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                                Brand Image
                            </label>
                            <input className="form-control"
                                type="file"
                                id="formFile"
                                onChange={(e) => setBrandImage(e.target.files[0])}
                                required
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-danger px-5 py-2  ">
                                Add
                            </button>
                        </div>
                    </form>
                    {loader ? <ModalLoader /> : null}
                </Modal.Body>
            </Modal>
        </>
    )
}
