import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';


const Header = () => {
    return (
        <div className="header">
            <img className="logo" src={logo} alt=""></img>
            <nav className="nav">
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/order-review">Order Review</NavLink>
                <NavLink to="/manage-inventory">Manage Inventory</NavLink>
            </nav>
        </div>
    );
};

export default Header;