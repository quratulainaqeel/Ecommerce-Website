import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ModalLoader from './ModalLoader';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AiOutlineEdit } from 'react-icons/ai'


export default function UpdateModal({ recalldata, categoryname }) {
    const [show, setShow] = useState(false);
    const [CategoryImage, setCategoryImage] = useState(null)
    const [loader, setloader] = useState(false)

    const handleClose = () => {
        setShow(false);
    }

    const UpdateCategory = (e) => {
        e.preventDefault();
        setloader(true)

        const storageRef = ref(storage, `Images/Category/${CategoryImage.name}`);
        uploadBytes(storageRef, CategoryImage).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    const payload = {
                        CategoryName: categoryname,
                        CategoryImage: url
                    };
                    axios.put('http://localhost:4000/api/update-category', payload)
                        .then((json) => {
                            recalldata(json.data.Category);
                            setloader(false);
                            handleClose();
                        })
                        .catch((err) => console.log(err));

                    Swal.fire({
                        title: "Category Updated Successfully!",
                        text: "The category has been updated successfully.",
                        icon: "success",
                        confirmButtonText: "OK",
                        timer: 2000
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setloader(false);
                });
        });

    }
    return (
        <>
            <div className="btn btn-dark ms-1" onClick={() => setShow(true)}><AiOutlineEdit /></div>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Update Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={UpdateCategory}>
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
                                Update
                            </button>
                        </div>
                    </form>
                    {loader ? <ModalLoader /> : null}
                </Modal.Body>
            </Modal>
        </>
    );
}