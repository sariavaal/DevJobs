import { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarComponent from '../NavbarComponent';
import { useParams } from 'react-router-dom';
import { calculateDistance } from './CalculateDistance';

const SearchResultPage = () => {
    const {query} = useParams();
    const [jobs, setJobs] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/job/search/${query}`);
                setJobs(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJobs();
    }, [query]);


    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    }, []);

    const filteredJobs = jobs.filter((job) => {
        if (!userLocation) {
            return true;
        }
        const distance = calculateDistance(
            job.lat, job.lng,
            userLocation.lat, userLocation.lng
        );
        return distance <= 1;
    });
        

    return (
        <div>
            <NavbarComponent />
            <div className="container">
                <h1 className='text-center mt-5'>Resultados de la búsqueda para: {query}</h1>
                {jobs.length === 0 && <p className="text-center text-danger mt-5">No se encontraron resultados para la búsqueda: {query}</p>}
                {userLocation && (
                    <p className="text-center mt-5">Más cercanos a tu ubicación</p>
                )}
                <div className="row">
                    {filteredJobs.map((job) => (
                        <div className="col-md-4" key={job._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{job.title}</h5>
                                    <p className="card-text">{job.description}</p>
                                    <a href={`/job/${job._id}`} className="btn btn-primary">Ver más</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResultPage;