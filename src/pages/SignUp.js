import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import swal from 'sweetalert';
import '../styles/styles.css';

const Signup = () => {

    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
    })

    const handleChange = (e) => {
        const data = e.target.name
        const value = e.target.value
        setCredentials({ ...credentials, [data]: value })
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        // Store the data in backend (mongoDB)
        const response = await fetch('http://localhost:5000/api/user', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.address,
            })
        })

        const signUp = await response.json()

        if (!signUp.success) {
            // If error in signUp --> display (validationResult) alert
            swal({
                title: "Oops!",
                text: signUp.errors[0].msg,
                icon: "error",
                button: {
                    text: "Try Again!",
                    className: "alert-button",
                },
            });
        } else {
            navigate('/login')
        }
    }

    return (
        <>
            <Navbar />
            <div className='container'>
                <form onSubmit={handleSignUp}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={handleChange} autocomplete="off" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={handleChange} autocomplete="off" />
                        <div id="emailHelp" className="form-text">Your Email is Safe with Us.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" name="address" value={credentials.address} onChange={handleChange} autocomplete="off" />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup
