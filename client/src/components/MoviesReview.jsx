import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderMovie from "./HeaderMovie";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
const MoviesReview = () => {
    const { user } = useContext(UserContext);

    const [movies, setMovies] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/movie/${id}`, { withCredentials: true });
                setMovies(response.data.movie);
                setReviews(response.data.movie.reviews);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Movie not found",
                    icon: "error",  
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/movies");
                    }
                })
            }
        };
        fetchMovie();
    }, [id]);

    const  getUserFullName = (user) => {
        if (user) {
            const { firstName, lastName } = user;
            return `${firstName} ${lastName}`;
        } else {
            return 'User not found';
        }
    }
    const isUserWithName = (userNameOfReviewer) => {
        return getUserFullName(user) === userNameOfReviewer;
    }
return (
    

    <div className="container mt-5 ">
        <HeaderMovie />
        <h1>Reviews for: {movies.title ? movies.title: "Loading..."}</h1>
        <table className="table">
                <thead>
                    <tr>
                        <th>Reviewer</th>
                        <th>Rating</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                {reviews.map((review, index) => (
                        <tr key={index}>
                            <td>{review.reviewerName} 
                            
                            {isUserWithName(review.reviewerName) &&	<svg onClick={
                                () => {
                                    Swal.fire({
                                        title: "Are you sure?",
                                        text: "You won't be able to revert this!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Yes, delete it!",
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            axios
                                                .delete(`http://localhost:8000/api/movie/${id}/review/${review._id}`, { withCredentials: true })
                                                .then((res) => {
                                                    Swal.fire("Deleted!", res.data.message, "success");
                                                    location.reload()
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                });
                                        }
                                }
                            )}}
                            _ xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="#f40b0b"><path fillRule="evenodd" d="M17 5V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1H4a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7h1a1 1 0 1 0 0-2zm-2-1H9v1h6zm2 3H7v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z" clipRule="evenodd"/><path d="M9 9h2v8H9zm4 0h2v8h-2z"/></g></svg>}</td>
                            <td>{review.rating}</td>
                            <td>
                            {review.review}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-danger">
                <Link onClick={ () => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                             axios.delete(`http://localhost:8000/api/movie/${id}`, { withCredentials: true })
                            .then(() => {
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                                navigate("/movies");
                            })
                            
                        }                        
                    })


                }}> Delete movie</Link>
            </button>
           
    </div>

)};

export default MoviesReview;

