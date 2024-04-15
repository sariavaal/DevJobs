import axios from "axios";
import MovieForm from "./MovieForm";
import Swal from "sweetalert2";
import HeaderMovie from "./HeaderMovie";
import { useNavigate } from 'react-router-dom';

const CreateMovie = () => {
    const navigate = useNavigate();
    const onSubmit = async (values, { resetForm }) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/movie", 
                values,  { withCredentials: true } );
            if (response.status === 200) {
                //alert("Movie created successfully");
                Swal.fire({
                    title: "Exito",
                    text: "Pelicula creada correctamente",
                    icon: "success"
                })
                resetForm();
                navigate("/movies");
            } else {
                console.log("Failed to create movie");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
        <HeaderMovie />
        <div className="container mt-5 ">
            
            <h1>Add Movie</h1>
            <MovieForm onSubmit={onSubmit} />
        </div>

        </>
    );
};
export default CreateMovie;
