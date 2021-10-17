import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Login.css';

const Login = () => {
    const {signInUsingGoogle} = useAuth();
    const location = useLocation();
    const history = useHistory();

    const redirect_url = location.state?.from || '/shop'; //when there will be no location, it will be home route
    //console.log('came from:', location.state?.from);

    //func to handle google sign in
    const handleGoogleLogin = () => {
        signInUsingGoogle()
        .then(result => {
            history.push(redirect_url);
       })
    }

    return (
        <div className="">
            <div className="login">
            <h3 className="">Sign in</h3>
            {/* form field */}

            <form onSubmit="">
                <label for="fname">Email</label>
                <input className="login-input" type="email" placeholder="Your email.."/>

                <label for="lname">Password</label>
                <input className="pass-input" type="password" placeholder="Password"/>
            
                <button type="type" className="add-to-cart-btn login-btn">Sign in</button>
            </form>
            <p className="">Don't have an account? <Link to="/register">Click to register</Link> </p>
            <button onClick={handleGoogleLogin} type="type" className="add-to-cart-btn login-btn">Sign in with google</button>
            </div>
        </div>
    );
};

export default Login;