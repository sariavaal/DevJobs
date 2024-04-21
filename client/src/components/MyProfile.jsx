import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";



const MyProfile = () => {

    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/user/myprofile/update/${id}`, { withCredentials: true });
                const userData = response.data.user;
                userData.profilePicUrl = `http://localhost:8000/uploads/${userData._id}/${userData.profilePic}`;
                setUser(userData);
                
               
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [id]);


    
return (
    <div>
    <NavbarComponent />
    <h1 className="text-center mt-3">Mi perfil</h1>
    <div className="container mt-3 ">
        
        <div className="row">
            <div className="col-md-5">
                <div className="card cardStyle">
                    <div className="card-body text-center">
                        <img
                            src={user?.profilePicUrl}
                            alt="profile"
                            className="img-fluid rounded-circle mb-3"
                            style={{ width: "150px" }}
                        />
                        <h2 className="card-title">{user?.name}</h2>
                        <p className="text-primary">{user?.firstName} {user?.lastName}</p>
                        <h3 className="card-text">Sobre mi</h3>
                        <p className="card-text">{user?.descripcion}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-7">
                <div className="card cardStyle">
                    <div className="card-body">
                        <h5 className="card-title text-center">Información Personal</h5>
                        <p className="card-text">Nombre: {user?.firstName}</p>
                        <p className="card-text">Apellido: {user?.lastName}</p>
                        <p className="card-text">Email: {user?.email}</p>
                        <p className="card-text">Telefono: {user?.telefono}</p>
                        <p className="card-text">Dirección: {user?.direccion}</p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    </div>
);
};

export default MyProfile;


