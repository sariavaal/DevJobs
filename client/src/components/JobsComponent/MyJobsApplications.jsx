import { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "../NavbarComponent";
import UserContext from "../../context/UserContext";
import { useContext } from "react";


const PropuestasList = () => {
    const { user } = useContext(UserContext);
    const userId = user?._id

    const [propuestas, setPropuestas] = useState([]);

    useEffect(() => {
        const fetchPropuestas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/job/user/${userId}/proposal`);
                setPropuestas(response.data);
                console.log('responde.data:',response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPropuestas();
    }, [ userId ]);

    return (
        <> <NavbarComponent />
        {propuestas.length === 0 ? 
        <p className="mt-5 text-center">Aún no has hecho ninguna propuesta.</p> :
        <>
    <div className="container">
      <h2 className="mt-5">Propuestas</h2>
      <ul className="list-group">
        {propuestas.map(propuesta => (
          <li className="list-group-item mt-3" key={propuesta._id}>
            {propuesta.propuestas.status === "aceptado" ? (
              <>
                <h3>Listo para entrevistas</h3>
                <p className="mb-1 text-success negrita">Propuesta aceptada </p>
                <p className="mb-1">Propuesta hecha por el usuario: {propuesta.propuestas.user_name}</p>
                <p className="mb-1">Descripción: {propuesta.propuestas.description}</p>
                <p className="mb-1">Teléfono: {propuesta.propuestas.telefono}</p>
                <p className="mb-1">Email: {propuesta.propuestas.email}</p>
                <p className="mb-1">En respuesta a la vacante: {propuesta.title}</p>
                <p className="mb-1">Estado: {propuesta.propuestas.status}</p>
              </>
            ) : (
              <>
                <h3>Pendientes de respuesta:</h3>
                <p className="mb-1">Propuesta hecha por el usuario: {propuesta.propuestas.user_name}</p>
                <p className="mb-1">Descripción: {propuesta.propuestas.description}</p>
                <p className="mb-1">Teléfono: {propuesta.propuestas.telefono}</p>
                <p className="mb-1">Email: {propuesta.propuestas.email}</p>
                <p className="mb-1">En respuesta a la vacante: {propuesta.title}</p>
                <p className="mb-1">Estado: {propuesta.propuestas.status}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  </>
    }
    </>
  );
};

export default PropuestasList;
   