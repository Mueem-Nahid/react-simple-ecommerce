import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <div className="login">
            <h3 className="">Create Account</h3>
            {/* form field */}

            <form onSubmit="">
                <label>Name</label>
                <input className="login-input" type="text" placeholder="Your name..."/>
                <label>Email</label>
                <input className="login-input" type="email" placeholder="Your email..."/>

                <label>Password</label>
                <input className="pass-input" type="password" placeholder="Password"/>
            
                <button type="type" className="add-to-cart-btn login-btn">Sign up</button>
            </form>
            <p className="">Already have an account? <Link to="/login">Click to login</Link> </p>
            <button type="type" className="add-to-cart-btn login-btn">Sign in with google</button>
            </div>
        </div>
    );
};

export default Register;