import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/signUp.css";
import { FaFacebook } from "react-icons/fa";
import { FaGooglePlus } from "react-icons/fa";
import { FaInvision } from "react-icons/fa";

function SignUp() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  useEffect(() => {
    document.body.classList.add("registration");
  }, []);
  return (
    <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
      <div className="form-container sign-up-container">
        <SignUpForm />
      </div>
      <div className="form-container sign-in-container">
        <SignInForm />
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <h3 className="reg-action">Boxstreet</h3>
          <div className="overlay-panel overlay-left">
            {/* <h3>Boxstreet</h3> */}
            <h1 className="reg-text">Welcome Back!</h1>
            <p className="reg-sub-text">
              To keep connected with us, please login with your personal info
            </p>
            <button className="reg-button ghost" onClick={toggleForm}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="reg-text">Hello, Friend!</h1>
            <p className="reg-sub-text">
              Enter your personal details and start your journey with us
            </p>
            <button className="reg-button ghost" onClick={toggleForm}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignUpForm() {
  return (
    <form>
      <h1 className="reg-text">Create Account</h1>
      <div className="social-container">
        <Link className="social">
          <i className="fb">
            <FaFacebook />
          </i>
        </Link>
        <Link className="social">
          <i className="gmail">
            <FaGooglePlus />
          </i>
        </Link>
        <Link className="social">
          <i className="linked">
            <FaInvision />
          </i>
        </Link>
      </div>
      <span className="reg-title">Or use your email for registration</span>
      <label>Full Name</label>
      <input type="text" placeholder="John Doe" />
      <label>Email</label>
      <input type="email" placeholder="johndoe@gmail.com" />
      <label>Password</label>
      <input type="password" placeholder="********" />
      <button className="reg-button">Sign Up</button>
      <h5 className="reg-term-condition">
        By clicking "SIGN UP" I agree to Boxstreet Terms of Service and Privacy
        Policy
      </h5>
    </form>
  );
}

function SignInForm() {
  return (
    <form>
      <h1 className="reg-text">Sign In to Boxstreet</h1>
      <div className="social-container">
        <Link className="social">
          <i className="fb">
            <FaFacebook />
          </i>
        </Link>
        <Link className="social">
          <i className="gmail">
            <FaGooglePlus />
          </i>
        </Link>
        <Link className="social">
          <i className="linked">
            <FaInvision />
          </i>
        </Link>
      </div>
      <span className="reg-title">Or use your email account:</span>
      <label>Your Email</label>
      <input type="email" placeholder="johndoe@gmail.com" />

      <div className="pswd">
        <label>Password</label>
        <Link className="forget" href="#">
          Forgot your password?
        </Link>
      </div>

      <input type="password" placeholder="********" />

      <button className="reg-button">Sign In</button>
    </form>
  );
}

export default SignUp;
