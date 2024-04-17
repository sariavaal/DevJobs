import { Formik, Form, Field, ErrorMessage } from 'formik';
import {updateSchema} from "./UserUpdateValidation";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProfile = () => {
    const { id } = useParams();
    console.log('id el params',id);
    const [user, setUser] = useState({});
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/api/user/myprofile/update/${id}`, { withCredentials: true });
            setUser(response.data.user);
            setInitialValues({
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                email: response.data.user.email,
                descripcion: response.data.user.descripcion,
                profilePic: response.data.user.profilePic,
                direccion: response.data.user.direccion,
                
            });
           
          } catch (error) {
            console.log(error);
          }
        }
        fetchUser();
        }
        
      
        
      }, [id]);

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/user/myprofile/update/${id}`, values, { withCredentials: true });
            console.log(response.data);
            Swal.fire({
                icon: "success",
                title: "Actualizado!",
                text: "Datos actualizados correctamente!",
                
            });
        } catch (error) {
            console.log(error);
        }
        }
    return (
        <div>
            <h1>Update Profile</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={updateSchema}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <Field
                            type="text"
                            name="firstName"
                            className="form-control"

                            
                        />
                        <ErrorMessage
                            name="firstName"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <Field
                            type="text"
                            name="lastName"
                            className="form-control"
                            
                        />
                        <ErrorMessage
                            name="lastName"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field
                            type="email"
                            name="email"
                            className="form-control"
                            
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="descripcion">Description</label>
                        <Field
                            type="text"
                            name="descripcion"
                            as="textarea"
                            className="form-control"
                            
                        />
                        <ErrorMessage
                            name="descripcion"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="profilePic">Profile Picture</label>
                        <Field
                            type="text"
                            name="profilePic"
                            className="form-control"
                            
                        />
                        <ErrorMessage
                            name="profilePic"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Phone Number</label>
                        <Field
                            type="text"
                            name="telefono"
                            className="form-control"
                            
                        />
                        <ErrorMessage
                            name="telefono"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="direccion">Address</label>
                        <Field
                            type="text"
                            name="direccion"
                            className="form-control"
                            
                        />
                        <ErrorMessage
                            name="direccion"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default UpdateProfile;

