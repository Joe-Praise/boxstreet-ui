import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/signUp.css";
import { FaFacebook, FaGooglePlus, FaInvision } from "react-icons/fa";
import axios from "axios";
import config from "../../config";

function SignUp() {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cinema_id: "",
  });

  const [cinemaData, setCinemaData] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email
      )
    ) {
      errors.email = "Invalid email address";
    }

    if (!formData.cinema_id) {
      errors.cinema_id = "Please select a cinema";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) { // Changed to "<" instead of "<="
      errors.password = "Password must be at least 8 characters long";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const isFormValid = validateForm();

      if (isFormValid) {
        const response = await axios.post(
          config.AUTH_REQUEST_URL + "/signup",
          formData
        );

        if (response?.data.status === "success") {
          navigate("/verify");
          setIsSignUpSuccess(true);
          setFormErrorMessage("");
        }
      } else {
        setFormErrorMessage(
          "Please fill in all required fields and correct any validation errors."
        );
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  useEffect(() => {
    axios.get(config.CINEMA_BASE_URL).then((result) => { // Changed to "axios.get" instead of "axios"
      setCinemaData(result.data);
    });
  }, []);

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
          cinemaData={cinemaData}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          isSignUpSuccess={isSignUpSuccess}
          setIsSignUpSuccess={setIsSignUpSuccess}
          formErrorMessage={formErrorMessage}
          setFormErrorMessage={setFormErrorMessage}
        />
      </div>
      <div className="form-container sign-in-container">
        <SignInForm
          formData={formData}
          setFormData={setFormData}
          isSignUpSuccess={isSignUpSuccess}
          formErrorMessage={formErrorMessage}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          setIsSignUpSuccess={setIsSignUpSuccess}
          setFormErrorMessage={setFormErrorMessage}
        />
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

function SignUpForm({
  formData,
  setFormData,
  handleSignUp,
  cinemaData,
  formErrors,
  setFormErrors,
  isSignUpSuccess,
  setIsSignUpSuccess,
  formErrorMessage,
  setFormErrorMessage,
}) {
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
      />
      {formErrors.name && <p className="error-message">{formErrors.name}</p>}

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="johndoe@gmail.com"
      />
      {formErrors.email && <p className="error-message">{formErrors.email}</p>}

      <label>Cinema</label>
      <select name="cinema_id" value={formData.cinema_id} onChange={handleChange}>
        <option value="">Select cinema here</option>
        {cinemaData?.map((cinema) => (
          <option key={cinema._id} value={cinema._id}>
            {cinema.name}
          </option>
        ))}
      </select>
      {formErrors.cinema_id && (
        <p className="error-message">{formErrors.cinema_id}</p>
      )}

      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="********"
      />
      {formErrors.password && (
        <p className="error-message">{formErrors.password}</p>
      )}

      {isSignUpSuccess ? (
        <div className="success-message">
          Registration successful! You can now log in.
        </div>
      ) : (
        <div>
          {formErrorMessage && (
            <p className="error-message">{formErrorMessage}</p>
          )}
          <button type="submit" className="reg-button">
            Sign Up
          </button>
        </div>
      )}

      <h5 className="reg-term-condition">
        By clicking "SIGN UP" I agree to Boxstreet Terms of Service and Privacy
        Policy
      </h5>
    </form>
  );
}

function SignInForm({
  formData,
  setFormData,
  isSignUpSuccess,
  formErrorMessage,
  formErrors,
  setFormErrors,
  setIsSignUpSuccess,
  setFormErrorMessage,
}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email
      )
    ) {
      errors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) { // Changed to "<" instead of "<="
      errors.password = "Invalid Password";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        config.AUTH_REQUEST_URL + "/login",
        formData
      );
      console.log("Response:", response);
      if (response?.data.status === "success") {
        // Handle successful sign-in
      } else {
        console.log("Sign-in failed. Server response:", response);
        setFormErrorMessage("Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setFormErrorMessage("An error occurred while signing in.");
    }
    
  };

  return (
    <form onSubmit={handleSignIn}>
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
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="johndoe@gmail.com"
      />
      {formErrors.email && (
        <p className="error-message">{formErrors.email}</p>
      )}

      <div className="pswd">
        <label>Password</label>
        <Link to="/forgot" className="forget" >
          Forgot your password?
        </Link>
      </div>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="********"
      />
      {formErrors.password && (
        <p className="error-message">{formErrors.password}</p>
      )}

      {formErrorMessage && (
        <p className="error-message">{formErrorMessage}</p>
      )}

      {isSignUpSuccess ? (
        <div className="success-message">Welcome to Boxstreet</div>
      ) : (
        <div>
          {formErrorMessage && (
            <p className="error-message">{formErrorMessage}</p>
          )}
          <button type="submit" className="reg-button">
            Sign In
          </button>
        </div>
      )}
    </form>
  );
}

export default SignUp;


