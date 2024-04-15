import UserForm from "../components/UserForm"
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="container degradado-borde-azul" style={{ maxWidth: "600px" }}> {/* Establecer un ancho máximo */}
                <h1 className="text-center p-4"> Registrarse en DevJobs</h1>
                <hr />
                <UserForm formType="register" />
                <div className="text-center">
                    <p>¿Ya tienes una cuenta? Inicia sesión aqui! <Link to="/">Iniciar sesión </Link></p>
                </div>
            </div>
        </div>
    );
    
};

export default LoginPage;
    