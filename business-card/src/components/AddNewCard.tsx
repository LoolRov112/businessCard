import { useFormik } from "formik";
import { FunctionComponent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ThemeContext } from "../App";
import Card from "../interfaces/Card";
import { addCard } from "../services/cardsService";
import { successMsg } from "../services/feedbacks";

interface AddNewCardProps {
  refresh: Function;
}

const AddNewCard: FunctionComponent<AddNewCardProps> = ({ refresh }) => {
  let theme = useContext(ThemeContext);
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      address: "",
      phone: "",
      image: "",
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2, `Name too short`),
      description: yup.string().required().min(2, `Description too short`),
      address: yup.string().required().min(4),
      phone: yup.string().required().min(10).max(10),
      image: yup.string().required(),
    }),
    onSubmit: (values: Card) => {
      values.userId = JSON.parse(
        sessionStorage.getItem("userDatas") as string
      ).token.userId;
      addCard(values)
        .then(() => {
          navigate("/mycards");
          refresh();
          successMsg(`Your card (${values.name}) added successfully`);
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
        <h1 style={{ color: theme.color, paddingBottom: "15px" }}>
          Add new card
        </h1>
        <div className="text-start">
          <form onSubmit={formik.handleSubmit} className="container w-50">
            <div className="form-floating mb-3">
              <input
                style={{ fontFamily: "Ubuntu" }}
                type="text"
                className="form-control my-2"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="name">Business Name:</label>
              {formik.touched.name && formik.errors.name && (
                <small style={{ color: "#E63462" }}>{formik.errors.name}</small>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                style={{ fontFamily: "Ubuntu" }}
                type="text"
                className="form-control my-2"
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="description">Business Description:</label>
              {formik.touched.description && formik.errors.description && (
                <small style={{ color: "#E63462" }}>
                  {formik.errors.description}
                </small>
              )}
            </div>
            <div className="form-floating">
              <input
                style={{ fontFamily: "Ubuntu" }}
                type="text"
                className="form-control my-2"
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="address">Business Address</label>
              {formik.touched.address && formik.errors.address && (
                <small style={{ color: "#E63462" }}>
                  {formik.errors.address}
                </small>
              )}
            </div>
            <div className="form-floating">
              <input
                style={{ fontFamily: "Ubuntu" }}
                type="text"
                className="form-control my-2"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="phone">Business Phone</label>
              {formik.touched.phone && formik.errors.phone && (
                <small style={{ color: "#E63462" }}>
                  {formik.errors.phone}
                </small>
              )}
            </div>
            <div className="form-floating">
              <input
                style={{ fontFamily: "Ubuntu" }}
                title="Put here the URL"
                type="text"
                className="form-control my-2"
                id="image"
                name="image"
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                style={{
                  color: "#322e18",
                  fontFamily: "Ubuntu",
                }}
                htmlFor="image"
                title="Put here the URL"
              >
                Business Image
              </label>
              {formik.touched.image && formik.errors.image && (
                <small style={{ color: "#E63462" }}>
                  {formik.errors.image}
                </small>
              )}
            </div>
            <button
              style={{
                backgroundColor: theme.bgButtonNav,
                fontFamily: "Ubuntu",
                color: "#322e18",
              }}
              type="submit"
              className="btn w-100 my-3"
              disabled={!formik.isValid || !formik.dirty}
            >
              <b>Add</b>
              <i className="fa-sharp fa-solid fa-plus"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewCard;
