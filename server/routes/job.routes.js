const express = require("express");

const jobController = require("../controllers/job.controller");

const JobRouter = express.Router();

//api/job
JobRouter.get("/", jobController.getAllJobs);
//filtrar por id de job
JobRouter.get("/:id", jobController.getJobById);
JobRouter.post("/create", jobController.createJob);
JobRouter.put("/:id", jobController.updateJob);
JobRouter.delete("/:id", jobController.deleteJob);
//filtrar por id de usuario
JobRouter.get("/user/:userId", jobController.getJobsByUserId);

//ruta para agregar una propuesta a un job
JobRouter.post("/:id/proposal", jobController.addProposalToJob);

JobRouter.put("/:job/proposal/:proposalId/:status", jobController.acceptOrRejectProposal);
//buscar las propuestas del ususario por el id de usuario contenido en el job
JobRouter.get("/user/:userId/proposal", jobController.getPropuestaById);
//busqueda de trabajos por palabra clave
JobRouter.get("/search/:query", jobController.searchJobsByWord);
module.exports = JobRouter
