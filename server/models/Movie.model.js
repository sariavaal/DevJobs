const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    reviewerName: {
        type: String,
        required: [true, "Reviewer name is required"]
    },
    rating: {
        type: Number,
        required: [true, "Review rating is required"]
    },
    review: {
        type: String,
        required: [true, "Review is required"]
    }
});

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Movie title is required"],
    },
    reviews: [reviewSchema]
});

module.exports.MovieModel = mongoose.model("Movie", MovieSchema);