import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavbarComponent from "../NavbarComponent";
import ProposalForm from "./ProposalForm";
import JobProposalsList from "./JobProposalsList";
import UserContext from "../../context/UserContext";
import { useContext } from "react";

const ViewDetailOfJob = () => {
    const [job, setJob] = useState(null);
    const [userName, setUserName] = useState(null);
    const {user} = useContext(UserContext);
    const [alreadyApplied, setAlreadyApplied] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/job/${id}`, {
                    withCredentials: true,
                });
                setJob(response.data);
                const userId = response.data.user;
                const userResponse = await axios.get(`http://localhost:8000/api/user/myprofile/update/${userId}`, {
                    withCredentials: true,
                })
                const nameAndLastName = `${userResponse.data.user.firstName} ${userResponse.data.user.lastName}`;
                const jobProposals = response.data.propuestas;
                jobProposals.forEach((jobProposal) => {
                    if (jobProposal.user === user._id) {
                        setAlreadyApplied(true);
                    }
                    if (alreadyApplied) {
                        return;
                    }
                })

                setUserName (nameAndLastName);
            } catch (err) {
                console.log("Error: ", err.response.data);
            }
        };

        fetchJob();
    }, []);

    if (!job || !userName) {
        return <div>Loading...</div>;
    }

    const formatDate = new Date(job.date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "America/Asuncion",
    });

    return (
        <div>
            <NavbarComponent />
            <h1 className="text-center mt-3">Detalles de la oferta</h1>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{job.title}</h5>
                                <p className="card-text">{job.description}</p>
                                <p className="card-text">
                                    <strong>Fecha de publicación:</strong>{" "}
                                    {job.date ? formatDate : "No disponible"}
                                </p>
                                <p className="card-text"><strong>Ubicación:</strong> {job.street}</p>
                                <p className="card-text"><strong>Salario:</strong> {job.salary}</p>
                                <p className="card-text"><strong>Tiempo:</strong> {job.type}</p>
                                <p className="card-text"><strong>Publicado por:</strong> { userName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                user._id === job.user &&
                <JobProposalsList jobProposals={job.propuestas} jobId={id} />
            }
            {
                user._id !== job.user && !alreadyApplied &&
                <ProposalForm jobId={id} />
            }
            {
                alreadyApplied && <p className="text-center border mt-3 shadow-sm ">Ya aplicaste a esta oferta</p>
            }

        </div>
    );
};

export default ViewDetailOfJob;