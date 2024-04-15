import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import UserContext from '../context/UserContext';
import { useContext } from 'react';
const  getUserFullName = (user) => {
    if (user) {
        const { firstName, lastName } = user;
        return `${firstName} ${lastName}`;
    } else {
        return 'User not found';
    }
}

const initialValues = {
    title: "",
    rating: "",
    reviewerName: "",
    review: "",
};

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required("Movie title is required")
        .min(3, "Movie title must be at least 3 characters"),
    rating: Yup.number().required("Movie rating is required"),
    review: Yup.string()
        .required("Movie review is required")
        .min(3, "Movie review must be at least 3 characters"),
});



const MovieForm = ( {onSubmit}) => {
    const { user } = useContext(UserContext);
    initialValues.reviewerName = getUserFullName (user)
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <Field
                            type="text"
                            name="title"
                            className="form-control"
                        />
                        <ErrorMessage
                            name="title"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Your name</label>
                        <Field
                            type="text"
                            name="reviewerName"
                            className="form-control"
                        />
                        <ErrorMessage
                            name="title"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <Field
                            type="number"
                            name="rating"
                            className="form-control"
                        />
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
                    <button 
                    type="button"
                    className="btn btn-danger"

                    >
                        <Link to="/movies">Cancel</Link>
                    </button>

                   
                      
                </Form>
            )}
        </Formik>
    );
};

MovieForm.propTypes = {
    

    onSubmit: PropTypes.func.isRequired


};

export default MovieForm;