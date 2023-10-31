import React, { useState, useEffect, useContext } from "react";
import "../../styles/navigation.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../uploads/FHC LOGO.png";
import { AppContext } from "../../utils/UserContext";

function Navigation() {
  const location = useLocation();
  const ctx = useContext(AppContext);
  const logout = ctx.onLogout;
  const getUser = JSON.parse(localStorage.getItem("UserData"));
  const [loginDetails] = useState(getUser);
  const [navSize, setnavSize] = useState("5rem");
  const [navColor, setnavColor] = useState("transparent");
  const [staticNav, setIsStaticNav] = useState(true);

  const listenScrollEvent = () => {
    window.scrollY > 20 ? setnavColor("#0B0B0D") : setnavColor("transparent");
    window.scrollY > 20 ? setnavSize("5rem") : setnavSize("5rem");
  };

  useEffect(() => {
    setIsStaticNav(false);
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
      setIsStaticNav(true);
    };
  }, [navColor]);

  const style = {
    backgroundColor: !staticNav ? "black" : navColor,
    height: navSize,
    transition: "all ease-in 1s",
  };
  return (
    <header
      className="navHead"
      // style={{
      //   backgroundColor: navColor,
      //   height: navSize,
      //   transition: "all ease-in 1s",
      // }}
      style={style}
    >
      <nav className="navigation">
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="web logo" />
          </Link>
        </div>
        {/* <div>
          <ul className="navlinks">
            <li className="from-left-and-back">FOOD & DRINKS</li>
            <li className="from-left-and-back">BOOKINGS</li>
            <li className="bsColour">JOIN OUR CLUB</li>
          </ul>
        </div> */}
        <div>
          <ul className="navlinks">
            <Link to="/history">
              <li className="from-left-and-back">CART</li>
            </Link>

            {loginDetails?.user_id?.length &&
            loginDetails?.cinema_id?.length &&
            loginDetails?.branch_id?.length &&
            loginDetails?.user_email?.length ? (
              <Link to="/profile">
                <li className="from-left-and-back">PROFILE</li>
              </Link>
            ) : (
              ""
            )}

            <Link to="/register">
              {loginDetails?.user_id?.length &&
              loginDetails?.cinema_id?.length &&
              loginDetails?.branch_id?.length &&
              loginDetails?.user_email?.length ? (
                <li className="from-left-and-back" onClick={logout}>
                  LOG OUT
                </li>
              ) : (
                <li className="from-left-and-back">SIGN IN</li>
              )}
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
