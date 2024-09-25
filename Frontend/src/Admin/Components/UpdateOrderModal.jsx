import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalLoader from './ModalLoader';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AiOutlineEdit } from 'react-icons/ai'

export default function UpdateOrderModal({ recalldata, order, orderStatus }) {

    const [show, setShow] = useState(false);
    const [status, setstatus] = useState('')
    const [loader, setloader] = useState(false)

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setstatus(orderStatus)
        setShow(true);
    }
    const UpdateOrder = (e) => {
        e.preventDefault();
        setloader(true)


        const payload = {
            _id: order,
            status: status
        }
        axios.put('http://localhost:4000/api/update-order', payload)
            .then((json) => {
                recalldata(json.data.Order);
                setloader(false);
                handleClose();
            })
            .catch((err) => console.log(err));

        Swal.fire({
            title: "Status Updated Successfully!",
            text: "The status has been updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
            timer: 2000
        });
    }

    return (
        <>
            <div className="btn btn-dark ms-1" onClick={handleShow}>
                <AiOutlineEdit />
            </div>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Update Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={UpdateOrder}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label" >
                                Status
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Update Status '
                                value={status}
                                onChange={(e) => setstatus(e.target.value)}
                                required
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-danger px-5 py-2  ">
                                Update
                            </button>
                        </div>
                    </form>
                    {/* {loader ? <ModalLoader /> : null} */}
                </Modal.Body>
            </Modal>
        </>
    )
}
