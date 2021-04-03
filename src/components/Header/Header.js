import React, { useContext } from 'react';
import './Header.css';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';


const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const {isSignedIn, name} = loggedInUser;
    console.log('header',name, isSignedIn);

    return (
        <div className='container'>

            <Navbar expand="lg">
                <Link to="/" className='header-title navbar-brand'>BD Fresh Market</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto header-nav">
                        <Link to="/home" className="nav-link">Home </Link>
                        <Link to="/orders" className="nav-link">Orders </Link>
                        <Link to="/admin" className="nav-link">Admin </Link>
                        <Link to="/login" className='login-nav nav-link'>
                            {
                                isSignedIn ? name : "Login"
                            }
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>
    );
};

export default Header;