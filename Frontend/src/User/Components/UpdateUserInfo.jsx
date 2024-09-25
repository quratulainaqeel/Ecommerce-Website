import { GlobalContext } from '../../Context/Context';
import React, { useContext, useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt'
import Modal from 'react-bootstrap/Modal';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage} from '../../Admin/utils/FirebaseConfig';
import ModalLoader from './ModalLoader';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BsPencil } from 'react-icons/bs'


export default function UpdateUserInfo() {
    const { state, dispatch } = useContext(GlobalContext)
    const user = decodeToken(state.token)

    const [show, setShow] = useState(false);
    const [ProfilePic, setProfilePic] = useState("https://firebasestorage.googleapis.com/v0/b/cosmetics-api-storage-941af.appspot.com/o/user.png?alt=media&token=4eef9d27-fbb7-4db5-9e61-36026dd9b8d5")
    const [loader, setloader] = useState(false)
    const [username, setusername] = useState("")


    useEffect(() => {
        axios.get(`http://localhost:4000/api/get-user-by-id?_id=${user.id}`).then((json) => {
            setusername(json.data.User.username)
            setProfilePic(json.data.User.profile_pic)
        })
            .catch((err) => console.log(err))
    }, [])

    const handleClose = () => {
        setShow(false);
    }

    const UpdateProfile = (e) => {
        e.preventDefault();
        setloader(true)

        const payload = {
            _id: user.id,
            profile_pic: ProfilePic,
            username
        }

        const Config = {
            url: 'http://localhost:4000/api/update-user',
            data: payload,
            method: "PUT"
        }
        axios(Config)
            .then((json) => {
                setProfilePic(json.data.User.profile_pic)
                setusername(json.data.User.username)
                console.log(json.data.message)
                setloader(false)
                handleClose()

                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated',
                    text: 'Your profile has been successfully updated.',
                    timer: 1500
                });
            })
            .catch((error) => { console.log(error) });
    }

    const EditProfilePic = (pic) => {
        const storageRef = ref(storage, `Images/UserProfile_pic/${pic.name}`);
        uploadBytes(storageRef, pic).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((url) => setProfilePic(url))
                .catch((error) => { console.log(error) });
        });
    }

    return (
        <>
            <div className='d-flex align-items-center '>
                <img src={ProfilePic} alt="user" width={45} height={45} onClick={() => setShow(true)} className='rounded-circle me-2 object-fit-cover' />
                
            </div>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>User Info </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={UpdateProfile}>
                        <div className="mb-3">
                            <label htmlFor="Username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder='Enter Username'
                                className="form-control"
                                id="Username"
                                aria-describedby="emailHelp"
                                value={username}
                                onChange={(e) => setusername(e.target.value)}

                            />
                        </div>
                        <label htmlFor="formFile" className="form-label">
                            Profile pic
                        </label>

                        <div className='position-relative'>
                            <input className="form-control d-none"
                                type="file"
                                id="formFile"
                                onChange={(e) => EditProfilePic(e.target.files[0])}
                            />

                            <label htmlFor="formFile" className="form-label position-relative ">
                                <img src={ProfilePic} alt="" className="border border-danger rounded-circle object-fit-cover" width={160} height={160} />
                                <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle p-2" style={{top:"-10"}}>
                                    <BsPencil className='fs-6' />
                                    <span className="visually-hidden">Edit Profile Picture</span>
                                </span>
                            </label>

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
    )
}
