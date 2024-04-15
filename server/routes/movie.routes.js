const express = require("express");

const movieController = require("../controllers/movie.controller");

const { authenticate } = require("../config/jwt.config");

const MovieRouter = express.Router();

//api/movie

MovieRouter.get("/",authenticate, movieController.getAllMovies);
MovieRouter.get("/:id",authenticate, movieController.getMovieById);
MovieRouter.post("/",authenticate, movieController.createMovie);
MovieRouter.put("/:id",authenticate, movieController.updateMovie);
MovieRouter.delete("/:id",authenticate, movieController.deleteMovie);
MovieRouter.delete("/",authenticate, movieController.deleteAllMovies);
MovieRouter.post("/:id/review",authenticate, movieController.addReviewtoMovie);
MovieRouter.delete("/:movieId/review/:reviewId",authenticate, movieController.deleteReviewByReviewerId);


module.exports = MovieRouter
