import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "../../styles/signUp.css";
import { FaFacebook } from "react-icons/fa";
import { FaGooglePlus } from "react-icons/fa";
import { FaInvision } from "react-icons/fa";
import axios from "axios";

function SignUp({ history }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(process.env.REACT_APP_AUTH_REQUEST_URL + "/signup", formData); 
      
      console.log(response.data);
      history.push("/verify");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.body.classList.add("registration");
  }, []);

  return (
    <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
      <div className="form-container sign-up-container">
        <SignUpForm
          formData={formData}
          setFormData={setFormData}
          handleSignUp={handleSignUp}
        />
      </div>
      <div className="form-container sign-in-container">
        <SignInForm />
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <h3 className="reg-action">Boxstreet</h3>
          <div className="overlay-panel overlay-left">
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

function SignUpForm({ formData, setFormData, handleSignUp }) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSignUp}>
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
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="John Doe"
        required
      />
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="johndoe@gmail.com"
        required
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="********"
        required
      />
      <button type="submit" className="reg-button">
        Sign Up
      </button>
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
      <input type="email" placeholder="johndoe@gmail.com" required />

      <div className="pswd">
        <label>Password</label>
        <Link className="forget" href="#">
          Forgot your password?
        </Link>
      </div>

      <input type="password" placeholder="********" required />

      <button className="reg-button">Sign In</button>
    </form>
  );
}

export default SignUp;

