import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import UserContext from '../../context/UserContext';
import { jobSchema } from './JobFormValidations';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";
import NavbarComponent from '../NavbarComponent';

import MapComponent from './MapComponente';


const JobForm = () => {
    const { user } = useContext(UserContext);
    const id = user?._id
    console.log(id)


    const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
        try {
            const response = axios.post("http://localhost:8000/api/job/create", values,
                { withCredentials: true });
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Trabajo creado',
                text: 'Trabajo creado correctamente',
            })
            setSubmitting(false);
            resetForm();
        } catch (err) {
            console.log("Error: ", err.response.data);
            setErrors({ general: err.response.data.msg });
        }
    };
    const initialValues = {
        title: "",
        description: "",
        salary: "",
        lat: "",
        lng: "",
        street: "",
        type: "",
        user: id
    }

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={jobSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <>
            <NavbarComponent />
            <h1 className="text-center mt-3">Crear Trabajo</h1>
            <div className="col-md-6">
              <Form>
                <Field type="hidden" name="lat" />
                <Field type="hidden" name="lng" />
                <Field type="hidden" name="street" />
                <div className="form-group">
                  <label htmlFor="title">Título</label>
                  <Field type="text" name="title" className="form-control" />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Descripción</label>
                  <Field
                    type="text"
                    name="description"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="salary">Salario</label>
                  <Field type="text" name="salary" className="form-control" />
                  <ErrorMessage
                    name="salary"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Tipo</label>
                  <Field
                    type="text"
                    name="type"
                    component="select"
                    className="form-control"
                  >
                    {["full-time", "part-time", "per-hour", "fixed-price"].map(
                      (type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      )
                    )}
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Enviar
                </button>
              </Form>
            </div>
            <MapComponent />
          </>
        )}
      </Formik>
    );
};

JobForm.propTypes = {
    formType: PropTypes.string.isRequired
};

export default JobForm;

