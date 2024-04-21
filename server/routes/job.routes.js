const express = require("express");

const jobController = require("../controllers/job.controller");

const JobRouter = express.Router();

//api/job
JobRouter.get("/", jobController.getAllJobs);
JobRouter.get("/:id", jobController.getJobById);
JobRouter.post("/create", jobController.createJob);
JobRouter.put("/:id", jobController.updateJob);
JobRouter.delete("/:id", jobController.deleteJob);

module.exports = JobRouter
