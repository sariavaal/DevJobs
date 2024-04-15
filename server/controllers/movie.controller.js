const { MovieModel } = require("../models/Movie.model");

module.exports = {
    createMovie: (req, res) => {
        const { title, reviewerName, rating, review } = req.body;
        const movie = new MovieModel({ title, reviews:{ reviewerName, rating, review } });
        movie
            .save()
            .then(() => {
                res.json({ msg: "success!", movie: movie });
            })
            .catch(err => res.json({ message: "Something went wrong", error: err }));
    },
    deleteReviewByReviewerId: async (req, res) => {
        try {
            const { movieId, reviewId } = req.params;
    
            const movie = await MovieModel.findById(movieId);
            if (!movie) {
                return res.status(404).json({ message: "Movie not found" });
            }
    
            const reviewIndex = movie.reviews.findIndex(review => review.id === reviewId);
            if (reviewIndex === -1) {
                return res.status(404).json({ message: "Review not found" });
            }
    
            movie.reviews.splice(reviewIndex, 1);
            const updatedMovie = await movie.save();
            res.json(updatedMovie);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    addReviewtoMovie: async (req, res) => {
        try {
            const { id } = req.params;
            const { reviewerName, rating, review } = req.body;
    
            const movie = await MovieModel.findById(id);
            if (!movie) {
                return res.status(404).json({ message: "Movie not found" });
            }
    
            movie.reviews.push({ reviewerName, rating, review });
            const updatedMovie = await movie.save();
            res.json(updatedMovie);
        } catch (error) {
            res.status(400).json({ message: "Something went wrong", error: error});
        }
    },
    getAllMovies: (req, res) => {
        MovieModel.find()
            .then(movies => {
                res.json({ movies: movies });
            })
            .catch(err => res.json({message: "Something went wrong", error: err}));
    },
    getMovieById: (req, res) => {
        MovieModel.findOne({ _id: req.params.id })
            .then(movie => {
                if (!movie) {
                    res.status(404).json({ message: "Movie not found" });
                }
                res.json({ movie: movie });
            })
            .catch(err => res.status(404).json({ message: "Movie not found" }));
    },
    updateMovie: (req, res) => {
        MovieModel
            .findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true, runValidators: true }
            )
            .then(updatedMovie => res.json(updatedMovie))
            .catch(err => res.json({message: "Something went wrong", error: err}));
    },
    deleteMovie: (req, res) => {
        MovieModel
            .findByIdAndDelete(req.params.id)
            .then(deletedMovie => res.json(deletedMovie))
            .catch(err => res.json({message: "Something went wrong", error: err}));
    },
    deleteAllMovies: (req, res) => {
        MovieModel
            .deleteMany()
            .then(deletedMovies => res.json(deletedMovies))
            .catch(err => res.json({message: "Something went wrong", error: err}));
    }
}
