import React from "react";
import "../../styles/landing.css";
import Banner from "./Banner";
import NowShowing from "./NowShowing";
import ScrollToTop from "../../utils/ScrollToTop";

function LandingPage() {
  ScrollToTop();
  return (
    <div className="landingBG">
      <Banner />
      <NowShowing />
    </div>
  );
}

export default LandingPage;
