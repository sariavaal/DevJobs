import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import HeaderMovie from "./HeaderMovie";
import ReviewForm from "./ReviewForm";
import { useNavigate } from 'react-router-dom';
const WriteReview = () => {
    const [movie, setMovie] = useState({});
    const navigate = useNavigate()

    const { id } = useParams();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/movie/${id}`, { withCredentials: true });
                setMovie(response.data.movie);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMovie();
    }, [id]);

        
    const onSubmit = async (values, { resetForm }) => {
        try {
            await axios.post(`http://localhost:8000/api/movie/${id}/review`, values, { withCredentials: true });
            Swal.fire({
                title: "Exito",
                text: "Review creado correctamente",
                icon: "success",
            });
            resetForm();
            navigate(`/movies/${id}`);
        } catch (err) {
            console.log("Error: ", err.response.data);
        }
    };
    const onCancel = () => {
        navigate(`/movies/${id}`);
    }
    return (
        <>
        <HeaderMovie />
        <div className="container mt-5 ">
            
            <h1>Add a review for: {movie.title ? movie.title: "Loading..."}</h1>

            <ReviewForm onSubmit={onSubmit} onCancel={onCancel}/>
        </div>

        </>
    );
};
export default WriteReview;



