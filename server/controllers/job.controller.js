const {JobModel} = require("../models/Job.model");
const {UserModel} = require("../models/User.model");



module.exports = {
    createJob: async (req, res) => {
        try {
          const { title, description, salary, lat, lng, street, type, user } = req.body;
          // Validar los datos recibidos en req.body
          if (!title || !description || !salary || !lat || !lng || !street || !type || !user) {
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
        JobSchema.find()
            .then(jobs => {
                res.json({ jobs: jobs });
            })
            .catch(err => res.json({message: "Something went wrong", error: err}));
    },

    getJobById: (req, res) => {
        JobSchema.findOne({ _id: req.params.id })
            .then(job => {
                if (!job) {
                    res.status(404).json({ message: "Job not found" });
                }
                res.json({ job: job });
            })
            .catch(err => res.status(404).json({ message: "Job not found" }));
    },

    deleteJob: (req, res) => {
        JobSchema
            .findByIdAndDelete(req.params.id)
            .then(deletedJob => res.json(deletedJob))
            .catch(err => res.json({message: "Something went wrong", error: err}));
    },

    updateJob: (req, res) => {
        JobSchema
            .findOneAndUpdate(
                { _id: req.params.id},
                req.body,
                { new: true, runValidators: true }
            )
            .then(updatedJob => res.json(updatedJob))
            .catch(err => res.json({message: "Something went wrong", error: err}));
    }

}

