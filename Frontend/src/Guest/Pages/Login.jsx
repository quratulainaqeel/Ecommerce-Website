import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, json } from 'react-router-dom'
import Swal from 'sweetalert2'
import { GlobalContext } from '../../Context/Context'
import Cookies from 'js-cookie'


export default function Login() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const { state, dispatch } = useContext(GlobalContext)

    const handleFormSubmission = (e) => {
        e.preventDefault();

        axios.get('http://localhost:4000/api/get-all-user')
            .then((json) => {
                const users = json.data.User;

                const userExists = users.some(user => user.email === email);

                if (!userExists) {
                    Swal.fire({
                        title: 'User doesnot Exists',
                        text: 'The provided email does not exist.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        timer: 3000,
                    });
                }
                else {
                    const payload = {
                        email: email,
                        password: password
                    }

                    axios.post('http://localhost:4000/api/login', payload).then((json) => {
                        Cookies.set('token', json.data.token);
                        dispatch({
                            type: "LOGIN",
                            token: json.data.token
                        })

                        Swal.fire({
                            title: 'Logged In!',
                            text: 'You have successfully logged into your account.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            timer: 3000
                        })


                    })
                        .catch((err) => {
                            console.log(err)
                            console.log("Pick Error Console", json.data)
                            Swal.fire({
                                title: 'Invalid Credentials',
                                text: 'Please enter valid Credentials to proceed .',
                                icon: 'error',
                                confirmButtonText: 'OK',
                                timer: 3000
                            })
                        })
                }
            })
    };

    return (
        <>
            <div className=" container d-flex justify-content-center align-items-center rounded " style={{ width: '100vw', height: '100vh' }}>
                <div className='bg-light p-5'>
                    <h3 className='mb-4'>Welcome! Please Login to continue</h3>

                    <form onSubmit={handleFormSubmission}>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label" >
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder='Please enter your Email '
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3 ">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder='Please enter your password'
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="d-grid col-12 mx-auto ">
                            <button className="btn btn-danger p-2" type="submit">Login</button>
                        </div>

                    </form>

                    <Link className='nav-link text-danger text-end ' to="/signup"><small><span className='text-dark'>Not Registered yet? </span>Signup</small></Link>

                </div>
            </div>
        </>
    )
}
