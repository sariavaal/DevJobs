import NavbarComponent from "./NavbarComponent";
import UserContext from "../context/UserContext";
import { useContext } from "react";


const HomePage = () => {

    const {user} = useContext(UserContext);

    const userName = user?.firstName


    return (
        <>
            <NavbarComponent />

            <div className="container mt-5">
                <h1 className="text-center"> ¡Bienvenido/a! {userName}</h1>
            </div>
        </>
    );
};

export default HomePage;