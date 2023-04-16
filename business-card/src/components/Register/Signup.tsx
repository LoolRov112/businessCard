import { useFormik } from "formik";
import { FunctionComponent, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ThemeContext } from "../../App";
import User from "../../interfaces/User";
import { successMsg } from "../../services/feedbacks";
import { addUser, getUserProfile } from "../../services/userService";

interface SignupProps {
  setIsLoggedIn: Function;
  setIsBusiness: Function;
}

const Signup: FunctionComponent<SignupProps> = ({
  setIsLoggedIn,
  setIsBusiness,
}) => {
  let theme = useContext(ThemeContext);
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: yup.object({
      name: yup.string().required().min(2, "Name too short"),
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values: User) => {
      addUser({ ...values, businessMan: false })
        .then((res) => {
          navigate("/about");
          setIsLoggedIn(true);
          setIsBusiness(false);
          sessionStorage.setItem(
            "userDatas",
            JSON.stringify({
              isLoggedIn: true,
              token: res.data,
            })
          );
          successMsg("You have successfully registered");
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <div
        className="container col-md-5 mt-5 w-100 text-center"
        style={{ backgroundColor: theme.backGroundComps }}
      >
        <h1
          style={{ fontFamily: "Ubuntu", color: theme.color }}
          className="text-center"
        >
          Register
        </h1>
        <form onSubmit={formik.handleSubmit} className="mt-3 w-50 container">
          <div className="mb-3 text-center" style={{ color: "#542344" }}>
            <label
              htmlFor="exampleInputEmail1"
              className="form-label"
              style={{ fontSize: "1.2rem", color: theme.color }}
            >
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.email && formik.errors.email && (
              <p style={{ color: "#E63462" }}>{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-3 text-center" style={{ color: theme.color }}>
            <label
              htmlFor="exampleInputEmail1"
              className="form-label"
              style={{ fontSize: "1.2rem", color: theme.color }}
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
          <div className="mb-3 text-center" style={{ color: theme.color }}>
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
              style={{ fontSize: "1.2rem", color: theme.color }}
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
            Sign-up
          </button>
        </form>
        <Link
          className="mt-2 text-center"
          to="/"
          style={{ color: theme.color }}
        >
          Already have user? Login here
        </Link>
      </div>
    </>
  );
};

export default Signup;
