import { useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import User from "../interfaces/User";
import * as yup from "yup";
import { checkUser } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import { errorMsg, successMsg } from "../services/feedbacks";

interface LoginProps {
  setIsLoggedIn: Function;
  setIsBusiness: Function;
  name: string;
}

const Login: FunctionComponent<LoginProps> = ({
  setIsLoggedIn,
  setIsBusiness,
  name,
}) => {
  let theme = useContext(ThemeContext);
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().email().min(5).required(),
      password: yup.string().min(8, "Password too short").required(),
    }),
    onSubmit: (values: User) => {
      checkUser(values)
        .then((res) => {
          successMsg(`Hello ${name}, you logged in succesfully`);
          navigate("/about");
          sessionStorage.setItem(
            "userDatas",
            JSON.stringify({
              isLoggedIn: true,
              token: res.data,
            })
          );
          setIsBusiness(res.data.businessMan);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          navigate("/");
          errorMsg("Wrong password or email");
        });
    },
  });
  return (
    <>
      <div
        className="container col-md-5 mt-5 w-100 text-center"
        style={{ background: theme.backGroundComps }}
      >
        <h1
          style={{ fontFamily: "Ubuntu", color: theme.color }}
          className="text-center"
        >
          Sign-In
        </h1>
        <form onSubmit={formik.handleSubmit} className="mt-3 w-50 container">
          <div className="mb-3 text-center" style={{ color: theme.color }}>
            <label
              style={{ fontSize: "1.2rem", color: theme.color }}
              htmlFor="exampleInputEmail1"
              className="form-label"
            >
              Email address:
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p style={{ color: "#E63462" }}>{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-3 text-center" style={{ color: "#542344" }}>
            <label
              style={{ fontSize: "1.2rem", color: theme.color }}
              htmlFor="exampleInputPassword1"
              className="form-label"
            >
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p style={{ color: "#E63462" }}>{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn text-light w-100 mt-2"
            style={{ backgroundColor: theme.bgButtonNav }}
            disabled={!formik.dirty || !formik.isValid}
          >
            Log-In
          </button>
        </form>
        <Link
          to="/signup"
          className="mt-2 text-center"
          style={{ color: theme.color }}
        >
          New user? Register here
        </Link>
      </div>
    </>
  );
};

export default Login;
