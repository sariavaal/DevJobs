import {useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import JobTypeBadge from "./JobTypeBadge";

const RecentJobs = () => {
  const [jobs, setJobs] = useState([]);

  const getAllJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/job", {
        withCredentials: true,
      });
      if (Array.isArray(response.data.jobs)) {
        setJobs(response.data.jobs);
      } else {
        console.log("Error: La propiedad 'jobs' no es un array en la respuesta");
      }

      console.log('responseee:',response.data);


      
    } catch (err) {
      console.log("Error: ", err.response.data);
    }
  };
//ordenar de mas reciente a mas anterior
  const sortJobsByDate = (jobs) => {
    return jobs.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  useEffect(() => {
    getAllJobs();
  }, []);

  function formatearDinero(dinero) {
    return dinero.toLocaleString('en-US', { style: 'currency', currency: 'PYG' });
  }
  return (
    <div>
      <h3 className="text-center">Ofertas recientes</h3>
      <div className="container">
        <div className="row">
          {sortJobsByDate(jobs).map((job) => {
            const formatDate = new Date(job.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              timeZone: "America/Asuncion",
            });
            return (
              <div className="col-md-9 border shadow-sm mb-1 border p-2 m-auto" key={job._id}>
                <div className="d-flex justify-content-between ">
                    <strong className="text-capitalize ">{job.title}
                    <JobTypeBadge type={job.type} />
                    </strong>
                    <div className="text-muted" style={{ fontSize: "14px" }}>{formatDate}</div>
                </div>
                <div className="texto-recortado mt-2 mb-2">{job.description}</div>
                <div className="d-flex justify-content-between ">
                    <div className="col-md-6">
                        <div className="text-capitalize " style={{ fontSize: "13px" , fontWeight: "700", alignContent: "space-evenly" }}>{formatearDinero(job.salary)}</div>
                        {job?.status ? <span className={`badge rounded-pill ${job.status === 'open' ? 'bg-success' : 'bg-danger'}  text-white`}>{job.status}</span> : <></>}
                    </div>
                    <div className="text-muted fs-6">
                        <Link to={`/job/${job._id}`} className="btn btn-sm btn-primary">
                        Ver oferta
                        </Link>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentJobs;
  


