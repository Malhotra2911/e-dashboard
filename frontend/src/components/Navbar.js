import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const auth = localStorage.getItem('user');
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate("/login");
    }
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">E-Dashboard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {auth ? 
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/products">Products</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/add">Add Product</Link>
                    </li>
                </ul> : "" }
                {auth ? 
                <form className="d-flex">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">                   
                        <li className="nav-item">
                        <Link className="nav-link btn mx-1" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                        <button className="nav-link btn mx-1" onClick={handleLogout}>Logout ({JSON.parse(auth).name})</button>
                        </li>
                    </ul>
                </form>
                    :
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0" text-align="right">
                        <li className="nav-item">
                        <Link className="nav-link" to="/signup">Signup</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    </ul>
}
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar