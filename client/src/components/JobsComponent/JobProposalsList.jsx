
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const JobProposalsList = ({ jobProposals, jobId }) => { 
    const navigate = useNavigate();
    //console.log(' jobId:',jobId)

    const handleAcceptProposal = async (proposalId) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/job/${jobId}/proposal/${proposalId}/aceptado`, 
                {},
                { withCredentials: true }
            );
            console.log("response:", response.data);
            Swal.fire({
                icon: "success",
                title: "Propuesta aceptada!",
                text: "has aceptado la propuesta!",
            });
            navigate("/inicio");
        } catch (error) {
            console.log(error);
        }
    }

    const handleRejectProposal = async (proposalId) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/job/${jobId}/proposal/${proposalId}/rechazado`, 
                {},
                { withCredentials: true }
            );
            console.log("response:", response.data);
            Swal.fire({
                icon: "success",
                title: "Propuesta rechazada!",
                text: "Tu propuesta ha sido rechazada!",
            });
        } catch (error) {
            console.log(error);
        }
    }
    //cuando el se acepta una propuesta ya no se admiten nuevas entradas
        if (jobProposals.some((proposal) => proposal.status === "aceptado")) {
            return (
                <div className="alert alert-warning text-center" role="alert">
                    Esta vacante ya no acepta nuevas propuestas, ya que está cerrada.
                </div>
            );
        }
            
    return (
        <>
            <div className="text-center mt-5">
                <strong>Propuestas:</strong>
            </div>
            {jobProposals.length === 0 && (
                <ul className="list-group container">
                    <li className="list-group-item">
                        <p>No hay propuestas disponibles.</p>
                    </li>
                </ul>
            )}
            {jobProposals.length > 0 && (
                <ul className="list-group container">
                    {jobProposals.map((jobProposal) => (
                        <li key={jobProposal._id} className="row border p-3 m-4 shadow-sm">
                            <div className="col-md-9">
                                <div>
                                    <div>
                                        <strong>Propuesto por:</strong>
                                        {jobProposal.user_name}
                                    </div>
                                    <div>
                                        <strong>Descripción:</strong> {jobProposal.description}
                                    </div>
                                    <div>
                                        <strong>Teléfono:</strong> {jobProposal.telefono}
                                    </div>
                                    <div>
                                        <strong>Email:</strong> {jobProposal.email}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 ">
                                <div className="row">
                                    <button className="btn btn-success" onClick={() => handleAcceptProposal(jobProposal._id)}>Aceptar</button>
                                </div>
                                <div className="mt-3 row">
                                    <button className=" btn btn-warning" onClick={() => handleRejectProposal(jobProposal._id)}>Rechazar</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )
            }



        </>
    );
};

export default JobProposalsList;
