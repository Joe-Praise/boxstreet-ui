import React from "react";
import "../styles/footer.css";
import logo from "../components/uploads/Screenshot__335_-removebg-preview (1).png";
import playstore from "../components/uploads/google-play.png";
import appstore from "../components/uploads/app-store.png";
import { BsYoutube, BsInstagram, BsFacebook } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";

function Footer() {
  return (
    <div className="footer">
      <div className="getapp">
        <img className="logo" style={{ width: "50px" }} src={logo} alt="" />
        <span>Get the app</span>
        <div className="apps">
          <img src={playstore} alt="playstore" />
          <img src={appstore} alt="appstore" />
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-links">
          <span>Company</span>
          <ul>
            <li>About Us</li>
            <li>Ticket prices</li>
            <li>Experiences</li>
          </ul>
        </div>
        <div className="footer-links">
          <span>Terms</span>
          <ul>
            <li>General</li>
            <li>Ticket sales & online booking</li>
            <li>Filmhouse+</li>
          </ul>
        </div>
        <div className="footer-links">
          <span>Contact</span>
          <ul>
            <li>Self Help</li>
            <li>Contact us</li>
            <li>Advertise with us</li>
          </ul>
        </div>
        <div className="footer-links">
          <span>Legal</span>
          <ul>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-links socials">
          <span>Socials</span>
          <ul>
            <li>
              <BsYoutube />
            </li>
            <li>
              <RiTwitterXFill />
            </li>
            <li>
              <BsFacebook />
            </li>
            <li>
              <BsInstagram />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
