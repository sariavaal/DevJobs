import { Formik, Form, Field, ErrorMessage } from 'formik';
import {updateSchema} from "./UserUpdateValidation";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarComponent from './NavbarComponent';
import ProfilePicUploader from './ProfilePicUploader';
import { useNavigate } from 'react-router-dom';


const UpdateProfile = () => {
    const { id } = useParams();
    console.log('id el params',id);
    const [user, setUser] = useState({});
    const [initialValues, setInitialValues] = useState({});

    const navigate = useNavigate();

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
                telefono: response.data.user.telefono,
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
            navigate('/inicio');
        } catch (error) {
            console.log(error);
        }
        }
    return (
        
        <div>
            <NavbarComponent />
            <h1 className="text-center mt-5">Update Profile</h1>
            <div className='row p-5'>
        <div className='col-md-6 justify-content-center d-flex align-items-center mb-5'><ProfilePicUploader /></div>
        <div className='col-md-6'>
           
            <Formik
                initialValues={initialValues}
                validationSchema={updateSchema}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                
                <Form className=''>
                    <div className="form-group">
                        <label htmlFor="firstName">Nombre:</label>
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
                        <label htmlFor="lastName">Apellido:</label>
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
                        <label htmlFor="email">Email:</label>
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
                        <label htmlFor="descripcion">Descripción:</label>
                        <Field
                            type="text"
                            name="descripcion"
                            as="textarea"
                            className="form-control"
                            placeholder="Ingresa tu descripción, ej: Tengo experiencia en el rubro de... trabajé en..., "
                            
                        />
                        <ErrorMessage
                            name="descripcion"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Numero de Telefono:</label>
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
                        <label htmlFor="direccion">Dirección:</label>
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
                    <button type="submit" className="btn btn-primary mt-3">
                        Actualizar Perfil
                    </button>
                </Form>
            </Formik>
            </div>
            </div>
        </div>

    );
};

export default UpdateProfile;

