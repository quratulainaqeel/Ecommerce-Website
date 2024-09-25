import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ModalLoader from './ModalLoader';
import axios from 'axios';
import Swal from 'sweetalert2';


function CategoryModal({ recalldata }) {
    const [show, setShow] = useState(false);
    const [CategoryName, setCategoryName] = useState('')
    const [CategoryImage, setCategoryImage] = useState(null)
    const [loader, setloader] = useState(false)

    const handleClose = () => {
        setShow(false);
        setCategoryName("");
    }
    const handleShow = () => setShow(true)

    const AddCategory = (e) => {
        e.preventDefault();
        setloader(true)

        const storageRef = ref(storage, `Images/Category/${CategoryImage.name}`);
        uploadBytes(storageRef, CategoryImage).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    const payload = {
                        CategoryName,
                        CategoryImage: url
                    }
                    const URL = 'http://localhost:4000/api/create-category'

                    axios.post(URL, payload).then((json) => {
                        recalldata(json.data.Category)
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
                <div>Add Category</div>
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={AddCategory}>
                        <div className="mb-3">
                            <label htmlFor="Category Name" className="form-label">
                                Category Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="Category Name"
                                aria-describedby="emailHelp"
                                value={CategoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                                Category Image
                            </label>
                            <input className="form-control"
                                type="file"
                                id="formFile"
                                onChange={(e) => setCategoryImage(e.target.files[0])}
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
    );
}
export default CategoryModal;