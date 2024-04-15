import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/user/forgot-password", { email })
            .then((res) => {
                setSuccess(res.data.msg);
                setError("");
                setEmail("");
            })
            .catch((err) => {
                setError(err.response.data.msg);
                setSuccess("");
            });
    };

    return (
        <div className="container mt-5 text-center"style={{ maxWidth: "600px" }}> 
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Ingresa tu correo</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Enviar instrucciones
                </button>
            </form>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
        </div>
    );
};

export default ForgotPassword;