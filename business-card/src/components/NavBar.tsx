import { FunctionComponent, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import { successMsg } from "../services/feedbacks";
interface NavBarProps {
  setIsLoggedIn: Function;
  isLoggedIn: boolean;
  isBusiness: boolean;
  darkMode: boolean;
  setDarkMode: Function;
}

const NavBar: FunctionComponent<NavBarProps> = ({
  setIsLoggedIn,
  isLoggedIn,
  isBusiness,
  darkMode,
  setDarkMode,
}) => {
  let navigate = useNavigate();
  let theme = useContext(ThemeContext);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ background: theme.background }}
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={"/about"}>
            <img
              src={theme.srcLogo}
              alt="logo"
              style={{ width: "2.5em", height: "2.5em" }}
            />
          </NavLink>

          <button
            style={{ backgroundColor: "#b8b8d1", color: theme.color }}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <div className="form-check form-switch d-flex justify-content-center mx-2 mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={() => {
                    setDarkMode(!darkMode);
                    document.body.style.backgroundColor = darkMode
                      ? "#fffffb"
                      : "#000000";
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  {darkMode ? (
                    <i className="fa-regular fa-moon mx-2 text-white"></i>
                  ) : (
                    <i className="fa-regular fa-sun mx-2 text-dark"></i>
                  )}
                </label>
              </div>

              <NavLink
                style={{ color: theme.color }}
                className="nav-link active text-center"
                aria-current="page"
                to={"/about"}
              >
                About
              </NavLink>
              {!isLoggedIn ? (
                <>
                  <NavLink
                    style={{ color: theme.color }}
                    className="nav-link mx-1 text-center"
                    to={"/"}
                  >
                    Sign-In
                  </NavLink>
                  <NavLink
                    style={{ color: theme.color }}
                    className="nav-link mx-1 text-center"
                    to={"/signup"}
                  >
                    Sign-Up
                  </NavLink>
                  <NavLink
                    style={{ color: theme.color }}
                    className="nav-link mx-1 text-center"
                    to={"/signupasB"}
                  >
                    Business
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    className="nav-link text-center mx-1"
                    style={{ color: theme.color }}
                    to={"/wishlist"}
                  >
                    Favorites
                  </NavLink>
                  {isBusiness && (
                    <>
                      <NavLink
                        style={{ color: theme.color }}
                        className="nav-link mx-1 text-center"
                        to={"/addnewcard"}
                      >
                        New Card
                      </NavLink>
                      <NavLink
                        style={{ color: theme.color }}
                        className="nav-link mx-1 text-center"
                        to={"/mycards"}
                      >
                        My Cards
                      </NavLink>
                    </>
                  )}
                  <NavLink
                    style={{ color: theme.color }}
                    className="nav-link text-center"
                    to={"/allcards"}
                  >
                    All Cards
                  </NavLink>
                  <button
                    style={{
                      backgroundColor: theme.bgButtonNav,
                      color: "#FFFFFB",
                    }}
                    id="navButton"
                    className="btn btnHover"
                    onClick={() => {
                      navigate("/");
                      setIsLoggedIn(false);
                      sessionStorage.removeItem("userDatas");
                      successMsg(`Bye Bye`);
                    }}
                  >
                    Log-Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
