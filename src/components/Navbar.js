import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from 'react-bootstrap/Badge';
import { useCart } from './CartProvider';
import Cart from '../pages/Cart';
import Modal from '../Modal';
import '../styles/styles.css';

const Navbar = () => {

    const [hover, setHover] = useState(false)
    const [cartView, setCartView] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        navigate('/login')
    }

    const items = useCart();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-bg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><LocalDiningRoundedIcon /> Tastio</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link px-4" aria-current="page" to="/"><HomeRoundedIcon /> Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-4" to="/features">Features</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-4" to="/features">Pricing</Link>
                            </li>
                            {(localStorage.getItem("authToken"))
                                ? <li className="nav-item">
                                    <Link className="nav-link px-4" to="/myorder">My Orders</Link>
                                </li>
                                : ""}
                        </ul>
                        <div>
                            {(localStorage.getItem("authToken"))
                                ? <div>
                                    <div className="btn bg-white text-success rounded-circle me-3" onClick={() => setCartView(true)}>
                                        <ShoppingCartRoundedIcon />
                                        {items.length !== 0 ? <Badge pill bg="danger">{items.length}</Badge> : ""}
                                    </div>
                                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                                    <div className={`btn ${hover ? 'text-dark' : 'text-danger'} px-4`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ "backgroundColor": hover ? "#E3FCBF" : "#fff" }} onClick={handleLogout}><LogoutIcon /> LogOut</div>
                                </div>
                                : <Link className={`btn ${hover ? 'text-dark' : 'text-success'} px-4`} to="/login" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ "backgroundColor": hover ? "#E3FCBF" : "#fff" }}><LoginRoundedIcon /> LogIn</Link>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
