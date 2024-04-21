import  { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css'; 
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const MapComponent = () => {
    const [lat, setLat] = useState(-27.337934);
    const [lng, setLng] = useState(-55.8604682);
    const [streetName, setStreetName] = useState('');

    useEffect(() => {
        const provider = new OpenStreetMapProvider();
        const map = L.map('mapa').setView([lat, lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const marker = L.marker([lat, lng], {
            draggable: true,
            autoPan: true
        }).addTo(map);

        marker.on('moveend', async (e) => {
            const newPosition = e.target.getLatLng();
            setLat(newPosition.lat);
            setLng(newPosition.lng);
            try {
                const results = await provider.search({ query: `${newPosition.lat},${newPosition.lng}` });
                if (results && results.length > 0) {
                    const streetName = results[0].label;
                    setStreetName(streetName);
                }
            } catch (error) {
                console.error('Error al obtener la dirección:', error);
                setStreetName('');
            }
        });

        return () => {
            map.remove();
        };
    }, [ lat, lng, streetName ]);

    return (
        <div className='col-md-6'> 
            <div id="mapa" style={{ height: '400px', width: '100%' }}></div>

            <p>Latitud: {lat}</p>
            <p>Longitud: {lng}</p>
            <p>Nombre de la calle: {streetName}</p> 
        </div>
    );
};

export default MapComponent;







