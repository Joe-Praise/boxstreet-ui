import "../../styles/nowShowing.css";
import MovieCarousel from "./MovieCarousel";
import ComingSoon from "./ComingSoon";
import Promotion from "./Promotion";
import Footer from "../Footer";
import Select from "./Select";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/UserContext";
import axios from "../../utils/axios";

function NowShowing() {
  const ctx = useContext(AppContext);
  const [initData] = ctx.getInitData;
  const [filterId, setFilterId] = ctx.getFilterId;
  const [initialized, setInitialized] = ctx.getInitialized;
  const [queryData, setQueryData] = ctx.getQueryData;
  const [branches, setBranches] = useState([]);

  const onGetCinemaHandler = (data) => {
    setFilterId((prevState) => {
      return {
        ...prevState,
        cinema_id: data._id,
      };
    });
  };

  const onGetBranchHandler = (data) => {
    setFilterId((prevState) => {
      return {
        ...prevState,
        branch_id: data._id,
      };
    });
  };

  const getBranches = useCallback(async () => {
    // if cinema selected === "All" get all branches in DB else query for that particular cinema
    const url =
      filterId.cinema_id === "1010101010"
        ? "/branches"
        : `/branches?cinema=${filterId.cinema_id}`;
    const response = await axios.get(url);
    setBranches(response.data);
  }, [filterId.cinema_id]);

  //   const getMovies = useCallback(async () => {}, []);

  useEffect(() => {
    getBranches();
  }, [getBranches]);

  return (
    <div className="nowShowing">
      <div className="nowShowingWidth">
        <div className="nowShowingHeader">
          <div>
            <h2>Now Showing</h2>
          </div>
          <div className="showVenueDates">
            <Select
              items={initData.cinemas}
              onGetHandler={onGetCinemaHandler}
              value={"Select cinema"}
            />
            <Select
              items={branches.length > 0 ? branches : []}
              onGetHandler={onGetBranchHandler}
              location={true}
              value={"Select location"}
            />
          </div>
        </div>
        <div>
          <MovieCarousel doubleMovies={queryData.movies} />
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
