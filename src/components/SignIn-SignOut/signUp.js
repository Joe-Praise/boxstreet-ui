import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/signUp.css";
import { FaFacebook, FaGooglePlus, FaInvision } from "react-icons/fa";
import axios from "axios";
import config from "../../config";
import baseAxios from "../../utils/axios";
import Loading from "../Loading";

let initailized = false;
function SignUp() {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cinema_id: "",
    branch_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [cinemaData, setCinemaData] = useState([]);
  const [branchData, setBranchData] = useState([]);

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
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!formData.cinema_id) {
      errors.cinema_id = "Please select a cinema";
    }

    if (!formData.branch_id) {
      errors.branch_id = "Please select a branch";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setIsLoading((prevState) => !prevState);
      const isFormValid = validateForm();

      if (isFormValid) {
        console.log(formData);
        const response = await axios.post(
          config.APP_BASE_URL + "/auth/signup",
          formData
        );
        console.log(response);

        if (response?.data.status === "success") {
          setIsSignUpSuccess(true);
          setFormErrorMessage("");
          navigate("/verify");
        }
        localStorage.setItem(
          "signUpEmail",
          JSON.stringify({
            email: formData.email,
            cinema_id: formData.cinema_id,
            branch_id: formData.branch_id,
          })
        );

        setIsLoading((prevState) => !prevState);
        setFormData({
          name: "",
          email: "",
          password: "",
          cinema_id: "",
          branch_id: "",
        });
      } else {
        setIsLoading((prevState) => !prevState);
        setFormErrorMessage(
          "Please fill in all required fields and correct any validation errors."
        );
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setIsLoading((prevState) => !prevState);
    }
  };

  // useEffect(() => {
  //   axios(config.APP_BASE_URL + "/cinemas").then((result) => {
  //     setCinemaData(result.data);
  //   });

  //   axios(config.APP_BASE_URL + "/branches").then((result) => {
  //     setBranchData(result.data);
  //   });
  // }, []);

  const getBranches = useCallback(async () => {
    // if cinema selected === "All" get all branches in DB else query for that particular cinema
    const url =
      formData?.cinema_id.length < 1
        ? "/branches"
        : `/branches?cinema=${formData?.cinema_id}`;
    const response = await baseAxios.get(url);
    setBranchData(response.data);
  }, [formData?.cinema_id]);

  useEffect(() => {
    if (!initailized) {
      axios(config.APP_BASE_URL + "/cinemas").then((result) => {
        setCinemaData(result.data);
      });
      getBranches();
    } else {
      getBranches();
    }
    return () => {
      initailized = true;
    };
  }, [getBranches]);

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
          branchData={branchData}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          isSignUpSuccess={isSignUpSuccess}
          setIsSignUpSuccess={setIsSignUpSuccess}
          formErrorMessage={formErrorMessage}
          isLoading={isLoading}
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
  branchData,
  formErrors,
  setFormErrors,
  isSignUpSuccess,
  setIsSignUpSuccess,
  formErrorMessage,
  isLoading,
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

      {/* <div>
    <div className="signUpSelect">

    </div>
    <div className="signUpSelect">
      
    </div>

</div> */}

      <label>Cinema</label>
      <select
        name="cinema_id"
        value={formData.cinema_id}
        onChange={handleChange}
      >
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

      <label>Branch</label>
      <select
        name="branch_id"
        value={formData.branch_id}
        onChange={handleChange}
      >
        <option value="">Select branch here</option>
        {branchData?.map((branch) => (
          <option key={branch._id} value={branch._id}>
            {branch.location_id.name} {branch.name}
          </option>
        ))}
      </select>
      {formErrors.branch_id && (
        <p className="error-message">{formErrors.branch_id}</p>
      )}

      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="********"
      />
      {/* {formErrors.password && (
        <p className="error-message">{formErrors.password}</p>
      )} */}

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
            {isLoading ? <Loading /> : "Sign Up"}
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const validateForm = () => {
  //   const errors = {};

  //   if (!formData.email.trim()) {
  //     errors.email = "Email is required";
  //   } else if (
  //     !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
  //   ) {
  //     errors.email = "Invalid email address";
  //   }

  //   if (!formData.password.trim()) {
  //     errors.password = "Password is required";
  //   } else if (formData.password.length < 8) {
  //     errors.password = "Invalid Password";
  //   }

  //   setFormErrors(errors);

  //   return Object.keys(errors).length === 0;
  // };

  const setUserInfoInLocalStorage = function (userData) {
    localStorage.setItem("UserData", JSON.stringify(userData));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      console.log("form data", formData);
      setIsLoading((prevState) => !prevState);
      const getSchedule = JSON.parse(localStorage.getItem("movieSchedule"));
      const response = await axios.post(
        config.AUTH_REQUEST_URL + "/login",
        formData
      );
      console.log("Response:", response.data);
      if (response?.data.status === "success") {
        const data = response.data.data;
        console.log(data);
        const userData = {
          user_id: data?._id,
          cinema_id: data?.cinema_id,
          branch_id: data?.branch_id,
          user_email: data?.email,
        };

        if (
          getSchedule?.movieSchedule_id?.length ||
          getSchedule?.schedule_date?.length ||
          getSchedule?.theater_id?.length
        ) {
          setUserInfoInLocalStorage(userData);
          navigate("/booking");
        } else {
          setUserInfoInLocalStorage(userData);
          navigate("/");
        }
        setIsLoading((prevState) => !prevState);
      } else {
        console.log("Sign-in failed. Server response:", response);
        setFormErrorMessage("Sign-in failed. Please try again.");
        setIsLoading((prevState) => !prevState);
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        cinema_id: "",
        branch_id: "",
      });
    } catch (error) {
      console.error("Error signing in:", error);
      setFormErrorMessage("An error occurred while signing in.");
      setIsLoading((prevState) => !prevState);
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
      {formErrors.email && <p className="error-message">{formErrors.email}</p>}

      <div className="pswd">
        <label>Password</label>
        <Link to="/forgotpassword" className="forget">
          Forgot your password?
        </Link>
      </div>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="****"
      />
      {formErrors.password && (
        <p className="error-message">{formErrors.password}</p>
      )}

      {/* {formErrorMessage && <p className="error-message">{formErrorMessage}</p>} */}

      {isSignUpSuccess ? (
        <div className="success-message">Welcome to Boxstreet</div>
      ) : (
        <div>
          {formErrorMessage && (
            <p className="error-message">{formErrorMessage}</p>
          )}
          <button type="submit" className="reg-button">
            {isLoading ? <Loading /> : "Sign In"}
          </button>
        </div>
      )}
    </form>
  );
}

export default SignUp;
