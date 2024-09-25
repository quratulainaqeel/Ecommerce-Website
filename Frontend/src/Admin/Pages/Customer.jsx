import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PagesLoader from '../Components/PagesLoader'
import { RiDeleteBin6Line } from 'react-icons/ri'

export default function Customer() {

    const [user, setuser] = useState([])
    const [loader, setloader] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:4000/api/get-all-user')
            .then((json) => {
                setuser(json.data.User)
                setloader(false)
            })
            .catch((err) => console.log(err))
    }, [])

    const deleteUser = (_id) => {
        axios.delete('http://localhost:4000/api/delete-user', { data: { _id } })
            .then(json => {
                setuser(json.data.User)
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            {
                loader ? <PagesLoader /> :
                    <div className="container">
                        <div className="rounded d-flex justify-content-between bg-light p-2 my-3 border border-danger">
                            <span className='fs-4 fw-semibold text-dark'>Customers</span>
                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Profile Pic</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Joining Date</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    user?.map((val, key) =>
                                        <tr key={key} className='align-middle'>
                                            <th scope="row">{key + 1}</th>
                                            <td><img src={val.profile_pic} alt="image" className='img-fluid rounded-circle border border-secondary' style={{ height: '10vh', aspectRatio: 1 / 1, objectFit: 'cover' }} /></td>
                                            <td>{val.username}</td>
                                            <td>{val.email}</td>
                                            <td>{val.role}</td>
                                            <td>{val.joiningDate}</td>
                                            <td>
                                                <div className="btn btn-danger" onClick={() => deleteUser(val._id)}>
                                                    <RiDeleteBin6Line />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </>
    )
}