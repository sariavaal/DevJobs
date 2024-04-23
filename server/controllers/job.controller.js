const mongoose = require("mongoose");
const { JobModel, PropuestaModel } = require("../models/Job.model");
const { UserModel } = require("../models/User.model");

module.exports = {
  createJob: async (req, res) => {
    try {
      const { title, description, salary, lat, lng, street, type, user } =
        req.body;
      // Validar los datos recibidos en req.body
      if (
        !title ||
        !description ||
        !salary ||
        !lat ||
        !lng ||
        !street ||
        !type ||
        !user
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }
      // Verificar si el usuario existe
      const userExists = await UserModel.findById(user);
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }
      // Crear el nuevo trabajo
      const newJob = new JobModel({
        title,
        description,
        salary,
        lat,
        lng,
        street,
        type,
        user: userExists._id,
      });
      // Guardar el nuevo trabajo en la base de datos
      await newJob.save();
      res.json({ message: "Job created successfully", newJob });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllJobs: (req, res) => {
    JobModel.find()
      .then((jobs) => {
        res.json({ jobs: jobs });
      })
      .catch((err) =>
        res.json({ message: "Something went wrong", error: err })
      );
  },

  getJobById: (req, res) => {
    //encontrar un job por el id de usuario
    JobModel.findById(req.params.id)
      .then((job) => res.json(job))
      .catch((err) =>
        res.json({ message: "Something went wrong", error: err })
      );
  },

  deleteJob: (req, res) => {
    JobModel.findByIdAndDelete(req.params.id)
      .then((deletedJob) => res.json(deletedJob))
      .catch((err) =>
        res.json({ message: "Something went wrong", error: err })
      );
  },

  updateJob: (req, res) => {
    JobModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((updatedJob) => res.json(updatedJob))
      .catch((err) =>
        res.json({ message: "Something went wrong", error: err })
      );
  },

  getJobsByUserId: async (req, res) => {
    try {
      const jobs = await JobModel.find({ user: req.params.userId });
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addProposalToJob: async (req, res) => {
    try {
      const { job, userId, description, telefono, email, user_name } = req.body;
      // Validar los datos recibidos en req.body
      if (!job || !userId || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }
      // Verificar si el usuario existe
      const userExists = await UserModel.findById(userId);
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }
      // Verificar si el trabajo existe
      const jobExists = await JobModel.findById(job);
      if (!jobExists) {
        return res.status(404).json({ message: "Job not found" });
      }
      // Crear la propuesta
      const newProposal = {
        user: userExists._id,
        user_name: user_name,
        description,
        telefono,
        email,
      };
      // Agregar la propuesta al trabajo
      jobExists.propuestas.push(newProposal);
      // Guardar el nuevo trabajo en la base de datos
      console.log("", jobExists);
      await jobExists.save();
      res.json({ message: "Proposal added successfully", newProposal });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  acceptOrRejectProposal: async (req, res) => {
    try {
      const { job, proposalId, status } = req.params;
      // Verificar si el trabajo existe
      const jobExists = await JobModel.findById(job);
      if (!jobExists) {
        return res.status(404).json({ message: "Job not found" });
      }
      // Verificar si la propuesta existe
      const proposalExists = jobExists.propuestas.find(
        (proposal) => proposal._id.toString() === proposalId
      );
      if (!proposalExists) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      // Actualizar el estado de la propuesta
      proposalExists.status = status;
      // Guardar el nuevo trabajo en la base de datos
      if (status === "aceptado") {
        jobExists.status = "closed";
      }
      await jobExists.save();
      res.json({ message: "Proposal updated successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getPropuestaById: async (req, res) => {
    const userId = req.params.userId;

    const objectId = new mongoose.Types.ObjectId(userId); // Convertir userId a ObjectId

    try {
        const propuestasUsuario = await JobModel.aggregate([
            // Filtrar los trabajos que contienen propuestas del usuario
            { $match: { "propuestas.user": objectId } },
            // Descomponer el array de propuestas y filtrar las del usuario
            { $unwind: "$propuestas" },
            { $match: { "propuestas.user": objectId } },
            //agregar el job de la propuesta

            
            // Opcional: proyectar solo los campos necesarios de las propuestas
            { $project: { "propuestas.user": 1, "propuestas.description": 1, "propuestas.telefono": 1, "propuestas.email": 1, "propuestas.user_name": 1, "_id": 1, "title": 1, "propuestas.status": 1 } },

        ]);

        res.json(propuestasUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las propuestas del usuario" });
    }
},
searchJobsByWord: async (req, res) => {
  const { query } = req.params;

  try {
      const jobs = await JobModel.find({ title: { $regex: query, $options: 'i' } });
      
      if (!jobs) {
          return res.status(404).json({ message: 'No jobs found' });
      }

      res.json(jobs);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
},

};
