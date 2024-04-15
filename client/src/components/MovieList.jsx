import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderMovie from "./HeaderMovie";

//import Swal from "sweetalert2";

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/movie", { withCredentials: true });
                console.log(response.data);
                setMovies(response.data.movies);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchMovies();
    }, []);

    const calculateAvgRating = (reviews) => {
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const avgRating = totalRating / reviews.length;
        return avgRating.toFixed(1);
    }

    return (
        <> <HeaderMovie />
        <div className="container mt-5">
            <h1 className="text-center">Movie List</h1>
            
            <div className="d-flex justify-content-end">
                <Link to="/movies/new" className="btn btn-primary">
                    Add a new Movie
                </Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Avg. Rating</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{calculateAvgRating(movie.reviews)}</td>
                            <td>
                                <button className="btn btn-primary">

                                    <Link to={`/movies/${movie._id}`}>Read Reviews</Link>

                                </button>
                            </td>
                            <td>
                                <button className="btn btn-success">
                                <Link to= {`/movies/${movie._id}/review`} > Write a review</Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            </div>

        </>


    );

};

export default MovieList;
          
                 
    



    

  