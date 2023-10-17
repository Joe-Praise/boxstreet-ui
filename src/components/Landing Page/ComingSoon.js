import React, { useContext } from "react";
import ComingsoonCarousel from "./ComingsoonCarousel";
import "../../styles/comingSoon.css";
import { AppContext } from "../../utils/UserContext";

function ComingSoon() {
  const ctx = useContext(AppContext);
  const [queryData] = ctx.getQueryData;
  return (
    <div className="comingSoon">
      <div className="comingSoonWidth">
        <div className="comingSoonHeader">
          <div>
            <h2>Coming Soon</h2>
          </div>
        </div>
        <div>
          <ComingsoonCarousel comingSoon={queryData.comingSoon} />
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
