import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import UserContext from "../context/UserContext";
import { useContext } from "react";


const getUserFullName = (user) => {
  if (user) {
    const { firstName, lastName } = user;
    return `${firstName} ${lastName}`;
  } else {
    return "User not found";
  }
};

const initialValues = {
  reviewerName: "",
  rating: "",
  review: "",
};

const validationSchema = Yup.object().shape({
  rating: Yup.number().required("Movie rating is required"),
  review: Yup.string()
    .required("Movie review is required")
    .min(3, "Movie review must be at least 3 characters"),
});

const ReviewForm = ({ onCancel, onSubmit }) => {
  const { user } = useContext(UserContext);
  initialValues.reviewerName = getUserFullName(user);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="reviewerName">Your name</label>
            <Field type="text" name="reviewerName" className="form-control" />
            <ErrorMessage
              name="reviewerName"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <Field type="number" name="rating" className="form-control" />
            <ErrorMessage
              name="rating"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="review">Review</label>
            <Field
              component="textarea"
              name="review"
              className="form-control"
            />
            <ErrorMessage
              name="review"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            Submit
          </button>
          <button type="button" className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={onCancel}>
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ReviewForm;
