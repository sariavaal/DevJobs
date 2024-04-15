import UserForm from "../components/UserForm"
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="container degradado-borde-azul" style={{ maxWidth: "600px" }}> {/* Establecer un ancho máximo */}
                <h1 className="text-center p-4"> Acceder a DevJobs</h1>
                <hr />
                <UserForm formType="login" />
                <div className="text-center d-flex justify-content-between mt-3">
                    <p className="col-md-6">¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
                    <p className="">¿Olvidaste tu contraseña? <Link to="/forgot-password">Recuperala</Link></p>
                </div>
            </div>
        </div>
    );
    
};

export default LoginPage;
    