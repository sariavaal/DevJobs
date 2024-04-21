const mongoose = require("mongoose");
const User = require("./User.model");

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
    }
});

module.exports.JobModel = mongoose.model("Job", JobSchema)