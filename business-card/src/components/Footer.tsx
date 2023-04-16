import { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  let theme = useContext(ThemeContext);
  return (
    <>
      <footer
        className="mt-5 text-center"
        style={{
          width: "100vw",
          height: "5em",
          background: theme.backgroundFooter,
        }}
      >
        <b style={{ color: "#fffffb" }}>Developed by Harel Rov&copy; in 2023</b>
        <span className="iconsFooter d-flex justify-content-evenly mb-2">
          <Link
            style={{ color: "#9bc995", fontSize: "2rem" }}
            to={"https://www.facebook.com/harel.rov"}
          >
            <i className="fa-brands fa-facebook"></i>
          </Link>
          <Link
            style={{ color: "#9bc995", fontSize: "2rem" }}
            to={"/https://www.linkedin.com/in/harel-rub-896535223/"}
          >
            <i className="fa-brands fa-linkedin"></i>
          </Link>
          <Link
            style={{ color: "#9bc995", fontSize: "2rem" }}
            to={"https://web.whatsapp.com/"}
          >
            <i className="fa-brands fa-whatsapp"></i>
          </Link>
        </span>
      </footer>
    </>
  );
};

export default Footer;
