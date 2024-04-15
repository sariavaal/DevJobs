import axios from "axios";
import UserContext from "../context/UserContext";
import { useContext } from 'react';

const HeaderMovie = () => {
    const { setUser } = useContext(UserContext);
    const logout = () => {
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
        <div className="d-flex justify-content-between p-3">
            <h1 className="text-center">Moldy Tomatoes</h1>
        <button className="btn btn-danger" onClick={() => {
            logout();
        }}>LOGOUT</button>
        </div>
    );
};
        

export default HeaderMovie;
