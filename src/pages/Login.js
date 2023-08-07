import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import Navbar from '../components/Navbar';
import swal from 'sweetalert';
import '../styles/styles.css';

const Login = () => {

  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const data = e.target.name
    const value = e.target.value
    setCredentials({ ...credentials, [data]: value })
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    // Verify the user from backend (mongoDB)
    const response = await fetch('http://localhost:5000/api/login', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    })

    const json = await response.json()

    if (!json.success) {
      // If error in logIn --> display (validationResult) alert
      swal({
        title: "Oops!",
        text: "Invalid Email or Password.",
        icon: "error",
        button: {
          text: "Try Again!",
          className: "alert-button",
        },
      });
    } else {
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", json.authToken)
      navigate('/')
    }
  }

  return (
    <>
      <Navbar />
      <div className='container'>
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={handleChange} autocomplete="off" />
            <div id="emailHelp" className="form-text">Your Email is Safe with Us.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success">LogIn</button>
          <Link to='/signup' className='m-4 btn btn-outline-danger'>New User <ArrowCircleRightRoundedIcon /> SignUp Here!</Link>
        </form>
      </div>
    </>
  )
}

export default Login
