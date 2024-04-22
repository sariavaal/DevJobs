import { useEffect } from "react";

const JobProposalsList = ({ jobProposals }) => {

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
                                    <button className="btn btn-success">Aceptar</button>
                                </div>
                                <div className="mt-3 row">
                                    <button className=" btn btn-warning">Rechazar</button>
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
