import React, { useState, useEffect } from "react";
import "../../styles/navigation.css";
import { Link } from "react-router-dom";
import logo from "../uploads/FHC LOGO.png";

function Navigation() {
  const [navSize, setnavSize] = useState("20rem");
  const [navColor, setnavColor] = useState("transparent");
  const listenScrollEvent = () => {
    window.scrollY > 20 ? setnavColor("#0B0B0D") : setnavColor("transparent");
    window.scrollY > 20 ? setnavSize("5rem") : setnavSize("5rem");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <header
      className="navHead"
      style={{
        backgroundColor: navColor,
        height: navSize,
        transition: "all ease-in 1s",
      }}
    >
      <nav className="navigation">
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="web logo" />
          </Link>
        </div>
        <div>
          <ul className="navlinks">
            <li className="from-left-and-back">FOOD & DRINKS</li>
            <li className="from-left-and-back">BOOKINGS</li>
            <li className="bsColour">JOIN OUR CLUB</li>
          </ul>
        </div>
        <div>
          <ul className="navlinks">
            <Link to="/movie">
              <li className="from-left-and-back">CART</li>
            </Link>
            <Link to="/register">
              <li className="from-left-and-back">SIGN IN</li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
