import { FunctionComponent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
  let navigate = useNavigate();
  let theme = useContext(ThemeContext);
  return (
    <>
      <div className="container">
        <h3 style={{ color: theme.color }}>Page not found</h3>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="btn"
          style={{ backgroundColor: theme.bgButtonNav, color: theme.bgAbout }}
        >
          click to go back
        </button>
      </div>
    </>
  );
};

export default PageNotFound;
