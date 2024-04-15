import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ResetPassword = () => {
    const { userId, token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
        axios
            .post(
                `http://localhost:8000/api/user/forgot-password/${userId}/${token}`,
                { password }, {withCredentials: true}
            )
            .then((res) => {
                Swal.fire("Contraseña cambiada", "Ahora puedes iniciar sesión con tu nueva contraseña", "success");
                setSuccess(res.data.msg);
                setError("");
                setPassword("");
                setConfirmPassword("");
            })
            .catch((err) => {
                setError(err.response.data.msg);
                setSuccess("");
            });
    };
    
    return (
        <div className="container mt-5 text-center" style={{ maxWidth: "600px" }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Enviar
                </button>
            </form>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    );
};

export default ResetPassword;

    

