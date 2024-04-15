import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailConfirmation = () => {
  const { userId, token } = useParams();
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [error, setError] = useState("");
  const [alreadyConfirmed, setAlreadyConfirmed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!alreadyConfirmed) {
        axios.get(
            `http://localhost:8000/api/user/verify/${userId}/${token}`, 
            { withCredentials: true }
        ).then((res) => {
            let response = res;
            setAlreadyConfirmed(true);
            if (response.data.confirmed) {
                setConfirmationMessage("Email confirmed successfully!");
                setError("");
            } else {
                setConfirmationMessage("");
                setError(response.data.msg);
            }
        }).catch((error) => {
            setConfirmationMessage("");
            console.log(error);
            setError("Error confirming email");
        });
    } else {
        setConfirmationMessage("Email confirmed successfully!");
        setError("");
    }
  }, [ userId, token,alreadyConfirmed ]);

  return (
    <div className="container mt-5 text-center">
      {confirmationMessage && !error && (
        <div>
          <p>{confirmationMessage}</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        </div>
      )}
      {error && !confirmationMessage && <p>{error}</p>}
    </div>
  );
};

export default EmailConfirmation;
