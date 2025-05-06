import { useFormik } from "formik";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { editCard, getSpesificCard } from "../services/cardsService";
import * as yup from "yup";
import { ThemeContext } from "../App";
import { routineMsg } from "../services/feedbacks";

interface UpdateCardProps {
  onHide: Function;
  id: string;
  refresh: Function;
}

const UpdateCard: FunctionComponent<UpdateCardProps> = ({
  onHide,
  id,
  refresh,
}) => {
  let theme = useContext(ThemeContext);
  let [cardData, setCardData] = useState<Card>({
    name: "",
    description: "",
    address: "",
    phone: "",
    image: "",
  });
  useEffect(() => {
    getSpesificCard(id)
      .then((res) => {
        setCardData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let formik = useFormik({
    initialValues: {
      name: cardData.name,
      description: cardData.description,
      address: cardData.address,
      phone: cardData.phone,
      image: cardData.image,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      description: yup.string().required().min(2),
      address: yup.string().required().min(4),
      phone: yup.string().required().min(10),
      image: yup.string().required(),
    }),
    onSubmit: (values: Card) => {
      editCard(id, values)
        .then(() => {
          onHide();
          refresh();
          routineMsg(`Your card updated succesfully`);
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <div className="text-start">
        <form onSubmit={formik.handleSubmit}>
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
            <label
              style={{ color: "#322e18", fontFamily: "Ubuntu" }}
              htmlFor="name"
            >
              Business Name:
            </label>
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
            <label
              style={{ color: "#322e18", fontFamily: "Ubuntu" }}
              htmlFor="description"
            >
              Business Description:
            </label>
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
            <label
              style={{ color: "#322e18", fontFamily: "Ubuntu" }}
              htmlFor="address"
            >
              Business Address
            </label>
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
            <label
              style={{ color: "#322e18", fontFamily: "Ubuntu" }}
              htmlFor="phone"
            >
              Business Phone
            </label>
            {formik.touched.phone && formik.errors.phone && (
              <small style={{ color: "#E63462" }}>{formik.errors.phone}</small>
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
              <small style={{ color: "#E63462" }}>{formik.errors.image}</small>
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
            Change your card
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateCard;
