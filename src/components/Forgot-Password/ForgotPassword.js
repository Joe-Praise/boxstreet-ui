import React, { useCallback, useContext, useEffect, useState } from "react";
import "../../styles/changepass.css";
import Navigation from "../Navigation/Navigation";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../utils/UserContext";
import Config from "../../config";

let initailized = false;
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState();
  const [fetchData, setFetchData] = useState({
    cinema: [],
    branch: [],
  });
  const ctx = useContext(AppContext);
  const [loginDetails] = ctx.getLoginDetails;
  const [updatePwd, setUpdatePwd] = useState({
    email: "",
    cinema_id: "",
    branch_id: "",
  });

  //   useEffect(() => {
  //     if (!loginDetails?.user_id?.length) {
  //       navigate("/");
  //     }
  //   }, []);

  const handleInputValue = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setUpdatePwd({ ...updatePwd, [key]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!updatePwd.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(updatePwd.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!updatePwd.cinema_id) {
      errors.cinema_id = "Please select a cinema";
    }

    if (!updatePwd.branch_id) {
      errors.branch_id = "Please select a branch";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const isFormValid = validateForm();
      if (isFormValid) {
        const response = await axios.post(`/auth/forgot-password`, updatePwd);
        const data = response.data.status;
        if (data === "success") {
          alert("Check your email for the reset password");
          navigate("/verify");
        } else {
          alert("something went wrong!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBranches = useCallback(async () => {
    // if cinema selected === "All" get all branches in DB else query for that particular cinema
    const url =
      updatePwd.cinema_id.length < 1
        ? "/branches"
        : `/branches?cinema=${updatePwd.cinema_id}`;
    const response = await axios.get(url);
    setFetchData((prevState) => {
      return {
        ...prevState,
        branch: response.data,
      };
    });
  }, [updatePwd.cinema_id]);

  useEffect(() => {
    if (!initailized) {
      axios(Config.APP_BASE_URL + "/cinemas").then((result) => {
        setFetchData((prevState) => {
          return {
            ...prevState,
            cinema: result.data,
          };
        });
      });
      getBranches();
    } else {
      getBranches();
    }
    return () => {
      initailized = true;
    };
  }, [getBranches]);

  return (
    <div>
      <Navigation />
      <div className="">
        <form className="ccPassform" onSubmit={updatePassword}>
          <h2>Forgot Password</h2>
          <div className="ccPassform-group">
            <label htmlFor="email">Email:</label>
            <input
              type=""
              name="email"
              id="email"
              placeholder="Enter your email"
              className="inputs"
              required
              value={updatePwd?.email}
              onChange={handleInputValue}
            />
            {formErrors?.email && (
              <p className="error-message">{formErrors.email}</p>
            )}
          </div>
          <label htmlFor="cinema">Cinema</label>
          <select
            id="cinema"
            name="cinema_id"
            value={updatePwd?.cinema_id}
            onChange={handleInputValue}
            // select class is coming from changePwd.css
            className="select"
          >
            <option value="">Select cinema here</option>
            {fetchData?.cinema?.map((cinema) => (
              <option key={cinema._id} value={cinema._id}>
                {cinema.name}
              </option>
            ))}
          </select>
          {formErrors?.cinema_id && (
            <p className="error-message">{formErrors.cinema_id}</p>
          )}

          <label htmlFor="branch">Branch</label>
          <select
            id="branch"
            name="branch_id"
            value={updatePwd?.branch_id}
            onChange={handleInputValue}
            // select class is coming from changePwd.css
            className="select"
          >
            <option value="">Select branch here</option>
            {fetchData?.branch?.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch?.location_id?.name}
              </option>
            ))}
          </select>
          {formErrors?.branch_id && (
            <p className="error-message">{formErrors.branch_id}</p>
          )}
          <div className="ccPassform-group">
            <button className="ccPassform-btn">Submit Password</button>
          </div>
        </form>
      </div>
      {/* <div className="ccPassform-group">
                  <label htmlFor="currentPwd">Current Password:</label>
                  <span></span>
                  <input
                    type="password"
                    id="currentPwd"
                    placeholder="Input current password"
                    name="password"
                    className="inputs"
                    required
                    value={updatePwd.password}
                    onChange={handleInputValue}
                  />
                </div>
                <div className="ccPassform-group">
                  <label htmlFor="newPassword">New Password:</label>
                  <span></span>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter new password"
                    className="inputs"
                    required
                    value={updatePwd.newPassword}
                    onChange={handleInputValue}
                  />
                </div>
                <section>*NOTE: Password should be at least 8 characters</section> */}
    </div>
  );
};

export default ForgotPassword;
