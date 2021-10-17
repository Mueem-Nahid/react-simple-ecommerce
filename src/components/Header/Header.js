import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../images/logo.png';
import './Header.css';


const Header = () => {
    const {user, logOut} = useAuth();
    return (
        <div className="header">
            <img className="logo" src={logo} alt=""></img>
            <nav className="nav">
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/order-review">Order Review</NavLink>
                <NavLink to="/manage-inventory">Manage Inventory</NavLink>
                {
                    user.email ? <NavLink to="/user">{user.displayName}</NavLink> : ""
                }
                {
                    user.email ?
                    <NavLink to="/" onClick={logOut}>Logout</NavLink> :
                    // <button onClick={logOut} className="">Log Out</button> :
                    <NavLink to="/login">Login</NavLink>
                }
            </nav>
        </div>
    );
};

export default Header;