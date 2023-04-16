import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

interface AboutProps {
  isLoggedIn: boolean;
}

const About: FunctionComponent<AboutProps> = ({ isLoggedIn }) => {
  let theme = useContext(ThemeContext);
  return (
    <>
      <div
        className="container w-100 mt-5"
        style={{ backgroundColor: theme.backGroundComps, overflowY: "hidden" }}
      >
        <div className="row">
          <div className="col-md-6">
            <h1 className="mt-5 display-3" style={{ color: theme.color }}>
              Who Are We?
            </h1>
            <p
              className="text-start mt-3 mb-1"
              style={{
                fontFamily: "Ubuntu",
                fontSize: "2rem",
                color: theme.color,
              }}
            >
              Biz is a platform for creating and publishing business cards.
            </p>
            <p
              className="text-start mb-4"
              style={{
                fontFamily: "Ubuntu",
                fontSize: "1.8rem",
                color: theme.color,
              }}
            >
              Other users will be able to see your business details and contact
              you with the details you provide on your business card.
            </p>
            <p
              className="text-start"
              style={{
                fontFamily: "Ubuntu",
                fontSize: "1.5rem",
                color: "#322E18",
              }}
            >
              {!isLoggedIn && (
                <Link style={{ textDecoration: "none" }} to={"/signup"}>
                  Register now and start your journey
                </Link>
              )}
            </p>
          </div>
          <div className="col-md-6">
            <img
              style={{ width: "34em", height: "30em" }}
              src="JonHenrey.jpg"
              alt="Business meeting"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
