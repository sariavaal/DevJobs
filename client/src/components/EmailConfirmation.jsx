import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailConfirmation = () => {
  const { userId, token } = useParams();
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [error, setError] = useState("");
  const [alreadyConfirmed, setAlreadyConfirmed] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!alreadyConfirmed) {
        axios.get(
            `http://localhost:8000/api/user/verify/${userId}/${token}`, 
            { withCredentials: true }
        ).then((res) => {
          let response = res;
          if (response.data.confirmed) {
            setConfirmationMessage("Email confirmado con exito!");
            setError("");
            setSuccessMessage(response.data.msg); 
            setAlreadyConfirmed(true);
          } else {
            setConfirmationMessage("");
            setError(response.data.msg);
          }
        })
        .catch((error) => {
          setConfirmationMessage("");
          console.log(error);
          setError("Error al confirmar el email");
        });
    }
  }, [userId, token, alreadyConfirmed]);

  return (
    <div className="container mt-5 text-center">
      {successMessage && (
        <div>
          <p>{successMessage}</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        </div>
      )}
      {error && !confirmationMessage && <p>{error}</p>}
      {confirmationMessage && !error && <p>{confirmationMessage}</p>}
    </div>
  );
};
export default EmailConfirmation;
