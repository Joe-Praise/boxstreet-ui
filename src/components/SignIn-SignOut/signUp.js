import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import './App.css';
import '../../styles/signUp.css'
import { FaFacebook } from "react-icons/fa";
import { FaGooglePlus } from "react-icons/fa";
import { FaInvision } from "react-icons/fa";

function SignUp() {
    const [isSignUp, setIsSignUp] = useState(false);
  
    const toggleForm = () => {
      setIsSignUp(!isSignUp);
    };
  
    return (
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">
          <SignUpForm />
        </div>
        <div className="form-container sign-in-container">
          <SignInForm />
        </div>
        <div className="overlay-container">
          <div className="overlay">
          <h3>Boxstreet</h3>
            <div className="overlay-panel overlay-left">
            {/* <h3>Boxstreet</h3> */}
              <h1>Welcome Back!</h1>
              <p>To keep connected with us, please login with your personal info</p>
              <button className="ghost" onClick={toggleForm}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={toggleForm}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function SignUpForm() {
    return (
      <form>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social"><i className='fb'><FaFacebook/></i></a>
          <a href="#" className="social"><i className='gmail'><FaGooglePlus/></i></a>
          <a href="#" className="social"><i className='linked'><FaInvision/></i></a>
        </div>
        <span>Or use your email for registration</span>
        <label>Full Name</label>
        <input type="text" placeholder="John Doe" />
        <label>Email</label>
        <input type="email" placeholder="johndoe@gmail.com" />
        <label>Password</label>
        <input type="password" placeholder="********" />
        <button>Sign Up</button>
        <h6>By clicking "SIGN UP" I agree to Boxstreet Terms of Service and Privacy Policy</h6>
      </form>
    );
  }
  
  function SignInForm() {
    return (
      <form>
        <h3>Sign In to Boxstreet</h3>
        <div className="social-container">
          <a href="#" className="social"><i className='fb'><FaFacebook/></i></a>
          <a href="#" className="social"><i className='gmail'><FaGooglePlus/></i></a>
          <a href="#" className="social"><i className='linked'><FaInvision/></i></a>
        </div>
        <span>Or use your email account:</span>
        <label>Email</label>
        <input type="email" placeholder="johndoe@gmail.com" />
     
        <label>Password</label>
        
        <input type="password" placeholder="********" />

        <a className='forget' href="#">Forgot your password?</a>

        <button >Sign In</button>

      </form>
    );
  }

  export default SignUp;
  