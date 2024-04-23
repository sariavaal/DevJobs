import { useState, useEffect, useRef } from "react";
import Dropzone from 'react-dropzone'
//import 'dropzone/dist/min/dropzone.min.css';
import axios from "axios";
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProfilePicUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const {user} = useContext(UserContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const id = user?._id

    const navigate = useNavigate();

    const dropzoneRef = useRef(null);

    useEffect(() => {
      if (dropzoneRef.current && dropzoneRef.current.dropzone) {
        dropzoneRef.current.dropzone.options.url = `http://localhost:8000/api/user/upload/${id}`;
      }
    }, [id]);
  
    const handleDrop = (files) => {
      setSelectedFile(files[0]);
      setSelectedImage(URL.createObjectURL(files[0])); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const response = await axios.post(`http://localhost:8000/api/user/upload/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            Swal.fire({
                icon: "success",
                title: "Actualizado!",
                text: "Imagen de perfil actualizada correctamente!",  
            });
            navigate('/inicio');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div id="dropzone" className="mt-2 mb- dropzone">
                <Dropzone
                    ref={dropzoneRef}
                    onDrop={handleDrop}
                    multiple={false}
                    accept="image/*"
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            {selectedImage ? (
                                <img src={selectedImage} alt="Selected" className="preview-image" />
                            ) : (
                                <p>Arrastra una imagen o haz click para seleccionar una</p>
                            )}
                        </div>
                    )}
                </Dropzone>
                </div>
                <button className="btn btn-primary mt-3" type="submit">Actualizar imagen de perfil</button>
            </form>
        </div>
    );

};
                        

export default ProfilePicUploader;
     

      
