import LogoutComponent from "./DropdownItems/LogoutComponent";
//import EditarPerfil from "./DropdownItems/EditarPerfil";
import {Link} from "react-router-dom";
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const NavbarComponent = () => {

    const {user} = useContext(UserContext);
    const id = user?._id
    return (
        <div className="">
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <h1 className="navbar-brand"> QuickJobs</h1>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/inicio">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/publicar-trabajo">Publicar trabajo</a>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <form className="d-flex" action="/search" method="GET">
                            <input className="form-control me-2" type="search" name="q" placeholder="Buscar" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Buscar</button>
                        </form>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Mi cuenta
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li>
                                <Link to={`/myprofile/${id}`} className="dropdown-item">Mi perfil</Link>
                            </li>
                            <li>
                                <Link to={`/myprofile/update/${id}`} className="dropdown-item">Editar perfil</Link>
                            </li>
                            <li><a className="dropdown-item" href="/account/applications">Mis aplicaciones</a></li>
                            <li><a className="dropdown-item" href="/account/jobs/mine">Mis trabajos</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <LogoutComponent />
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>


    );
};

export default NavbarComponent;