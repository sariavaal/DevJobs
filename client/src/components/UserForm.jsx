import { Formik, Form, Field, ErrorMessage } from 'formik';
import {loginSchema, registerSchema} from '../components/UserValidations'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import axios from "axios";

const UserForm = ({formType}) => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate()


    const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
        if (formType === "register") {
            registerUser(values, setErrors);
        } else {
            loginUser(values, setErrors);
        }
        setSubmitting(false);
        resetForm();
    };

    const registerUser = async (values, setErrors) => {
        try {
            await axios.post("http://localhost:8000/api/user/register", values,
            { withCredentials: true });
            //loginUser(values, setErrors);
            navigate("/confirm/email");
        } catch (err) {
            console.log("Error: ", err.response.data);
            setErrors({general: err.response.data.msg});
        }
    };

    const loginUser = async (values, setErrors) => {
        try {
            const response = await axios.post("http://localhost:8000/api/user/login", values,
            { withCredentials: true });
            console.log(response.data);
            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/inicio");
            
        } catch (err) {
            console.log("Error: ", err.response.data);
            setErrors({general: err.response.data.msg});
        }
    };

    return (
        <Formik
    initialValues={
        formType === "register"
            ? {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                telefono: "",
                direccion: "",
            }
            : {
                email: "",
                password: "",
            }
    }
    validationSchema={formType === "register" ? registerSchema : loginSchema}
    onSubmit={handleSubmit}
>
    {({ isSubmitting }) => (
        <Form>
        {formType === "register" && (
            <>
                <div className="form-group">
                    <label htmlFor="firstName">Nombre</label>
                    <Field type="text" name="firstName" className="form-control" />
                    <ErrorMessage name="firstName" component="div" className="alert alert-danger mb-3" />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Apellido</label>
                    <Field type="text" name="lastName" className="form-control" />
                    <ErrorMessage name="lastName" component="div" className="alert alert-danger" />
                </div>
                <div className='form-group'>
                    <label htmlFor="telefono">Teléfono</label>
                    <Field type="text" name="telefono" className="form-control" />
                    <ErrorMessage name="telefono" component="div" className="alert alert-danger" />
                </div>
                <div className='form-group'>
                    <label htmlFor="direccion">Dirección</label>
                    <Field type="text" name="direccion" className="form-control" />
                    <ErrorMessage name="direccion" component="div" className="alert alert-danger" />
                </div>
            </>
        )}
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="alert alert-danger" />
        </div>
        <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <Field type="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="alert alert-danger" />
        </div>
        {formType === "register" && (
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <Field type="password" name="confirmPassword" className="form-control" />
                <ErrorMessage name="confirmPassword" component="div" className="alert alert-danger" />
            </div>
        )}
        <button type="submit" className="btn btn-primary mt-3 btn-centrado" disabled={isSubmitting}>
            {formType === "register" ? "Register" : "Login"}
        </button>
        <ErrorMessage name="general" component="div" className="alert alert-danger" />
    </Form>

    )}
</Formik>
    );
};

UserForm.propTypes = {
    formType: PropTypes.string.isRequired
};

export default UserForm;


    







