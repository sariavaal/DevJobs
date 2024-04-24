import UserContext from "../../context/UserContext";
import { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import NavbarComponent from "../NavbarComponent";
import { Link } from "react-router-dom";

const MyJobsComponent = () => {
  const { user } = useContext(UserContext);
  const id = user?._id;
  const [myJobs, setMyJobs] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [jobs, setJobs] = useState([
    { id: 1, name: "Open" },
    { id: 2, name: "Closed" },
  ]);

  const getMyJobs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/job/user/${id}`,
        { withCredentials: true }
      );
      setMyJobs(response.data);
      console.log(response.data);
    } catch (err) {
      console.log("Error: ", err.response.data);
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/job/${jobId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      console.log(response.data);
      getMyJobs();
    } catch (err) {
      console.log("Error: ", err.response.data);
    }

    const jobIndex = myJobs.findIndex((job) => job._id === jobId);
    if (jobIndex === -1) {
      return;
    }

    const updatedJobs = [...myJobs];
    updatedJobs[jobIndex].status = newStatus;
    setJobs(updatedJobs);

    //deshabilitar el botón de cerrar trabajo si el estado es cerrado
    setIsButtonDisabled(true);
  };

  useEffect(() => {
    getMyJobs();
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center mt-5">Mis trabajos</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Fecha de publicación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {myJobs.map((job) => {
                  const formatDate = new Date(job.date).toLocaleDateString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      timeZone: "America/Asuncion",
                    }
                  );

                  return (
                    <tr key={job._id}>
                      <td>{job.title}</td>
                      <td>{job.description}</td>
                      <td>{formatDate}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleStatusChange(job._id, "closed")}
                          disabled={job.status === "closed"}
                        >
                          {job.status === "open" ? "Cerrar" : "Cerrado"}
                        </button>
                      </td>
                      <td>
                        <Link
                          to={`/job/${job._id}`}
                          className="btn btn-primary"
                        >
                          Ver
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyJobsComponent;
