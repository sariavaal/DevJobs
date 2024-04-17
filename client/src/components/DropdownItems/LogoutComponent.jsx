import axios from "axios";
import UserContext from "../../context/UserContext";
import { useContext } from 'react';

const LogoutComponent = () => {
    const { setUser } = useContext(UserContext);
    const handleLogout = () => {
        axios
            .post("http://localhost:8000/api/user/logout", null, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                localStorage.removeItem("user");
                setUser(null);
                window.location.href = "/";
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <li>
            <a className="dropdown-item" href="/logout" onClick={handleLogout}>
                Cerrar Sesión
            </a>
        </li>
    );
    }

export default LogoutComponent