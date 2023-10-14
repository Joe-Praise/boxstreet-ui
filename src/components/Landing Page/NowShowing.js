import "../../styles/nowShowing.css";
import MovieCarousel from "./MovieCarousel";
import ComingSoon from "./ComingSoon";
import Promotion from "./Promotion";
import Footer from "../Footer";
import Select from "./Select";


function NowShowing() {
  return (
    <div className="nowShowing">
      <div className="nowShowingWidth">
        <div className="nowShowingHeader">
          <div>
            <h2>Now Showing</h2>
          </div>
          <div className="showVenueDates">
            <Select />

            <select className="landingselect" name="viewDays">
              <option value="today">Today</option>
              <option value="tomorrow">Oct 6th</option>
              <option value="saturday">Oct 7th</option>
              <option value="sunday">Oct 8th</option>
              <option value="monday">Oct 9th</option>
              <option value="tusday">Oct 10th</option>
            </select>
          </div>
        </div>
        <div>
          <MovieCarousel />
        </div>
      </div>
      <div>
        <ComingSoon />
      </div>
      <div>
        <Promotion />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default NowShowing;
