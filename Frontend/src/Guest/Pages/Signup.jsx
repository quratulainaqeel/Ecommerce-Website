import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Sigup() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [username, setusername] = useState("")

    const Handlevent = (e) => {
        e.preventDefault();
        const payload = {
            username: username,
            email: email,
            password: password
        }
        axios.get('http://localhost:4000/api/get-all-user')
            .then((response) => {
                const users = response.data.User;

                const userExists = users.some(user => user.email === email);

                if (userExists) {
                    Swal.fire({
                        title: 'User Already Exists',
                        text: 'The provided email is already associated with an existing user.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        timer: 3000,
                    });
                }
                else {
                    const payload = {
                        username: username,
                        email: email,
                        password: password
                    };

                    axios.post('http://localhost:4000/api/signup', payload)
                        .then(json => {
                            console.log(json.data);

                        })
                        .catch(error => {
                            console.error(error);
                        });
                    Swal.fire({
                        title: 'Registration Successful!',
                        text: 'Your account has been created successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 3000,
                    })
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    title: 'Error',
                    text: 'An error occurred while retrieving user data.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });

        setemail('')
        setpassword('')
        setusername('')

    }

    return (
        <>
            <div className="container  d-flex justify-content-center align-items-center " style={{ width: '100vw', height: '100vh' }}>
                <div className='bg-light p-5 rounded'>
                    <h3 className='text-center mb-4'>Create your Account</h3>
                    <form onSubmit={Handlevent}>
                        <div className=" mb-3">

                            <div className="container">
                                <label className='form-label' htmlFor="\">Username</label>
                                <input type="text" name="" id=""
                                    placeholder='Enter Userame'
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setusername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className=" mb-3">
                            <div className="container">
                                <label className='form-label' htmlFor="\">Email</label>
                                <input type="email"
                                    placeholder='Enter your Email'
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    required
                                />
                            </div>


                        </div>

                        <div className="  mb-3">

                            <div className="container">
                                <label className='form-label' htmlFor="\">Password</label>
                                <input type="password"
                                    placeholder='Create new Password'
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    required
                                />
                            </div>

                        </div>
                        <div className="d-grid col-12 mx-auto mt-4">
                            <button className="btn btn-danger p-2" type='submit'>Sign Up</button>
                        </div>
                    </form>

                    <Link className='nav-link text-danger text-end' to="/login"><small><span className='text-dark'>Already a member ?</span> Login</small></Link>

                </div>
            </div>
        </>
    )
}