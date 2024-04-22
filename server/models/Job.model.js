const mongoose = require("mongoose");
const UserModel = require("./User.model");



const PropuestaSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        enum: ["aceptado", "rechazado", "pendiente"],
        default: "pendiente",
        type: String
    },
});

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job title is required"]
    },
    description: {
        type: String,
        required: [true, "Job description is required"]
    },
    salary: {
        type: Number,
        required: [true, "Job salary is required"]
    },
    lat: {
        type: Number,
        required: [true, "Job latitude is required"]
    },
    lng: {
        type: Number,
        required: [true, "Job longitude is required"]
    },
    street: {
        type: String,
        required: [true, "Job street is required"]
    },
    type: {
        enum: ["full-time", "part-time", "per-hour", "fixed-price"],
        type: String,
        required: [true, "Job type is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status : {
        enum: ["open", "closed"],
        type: String,
        default: "open"
    }, 
    date: {
        type: Date,
        default: Date.now
    },
    propuestas: [PropuestaSchema]
});


   

module.exports.JobModel = mongoose.model("Job", JobSchema)