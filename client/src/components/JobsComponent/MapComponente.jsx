import  { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css'; 
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const MapComponent = ({setLocationValues}) => {

    useEffect(() => {
        const provider = new OpenStreetMapProvider();
        const map = L.map('mapa').setView([0, 0], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const marker = L.marker([0, 0], {
            draggable: true,
            autoPan: true
        }).addTo(map);

        marker.on('moveend', async (e) => {
            const newPosition = e.target.getLatLng();
            try {
                const results = await provider.search({ query: `${newPosition.lat},${newPosition.lng}` });
                if (results && results.length > 0) {
                    const streetName = results[0].label;
                    setLocationValues(newPosition.lat, newPosition.lng, streetName);
                }
            } catch (error) {
                console.error('Error al obtener la dirección:', error);
            }
        });
            async function getCurrentPosition() {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                const newPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                try {
                    if (map) {
                        map.setView([newPosition.lat, newPosition.lng], 15);
                    }
    
                    if (marker) {
                        marker.setLatLng(newPosition);
                    }
                    const results = await provider.search({ query: `${newPosition.lat},${newPosition.lng}` });
                    if (results && results.length > 0) {
                        const streetName = results[0].label;
                        setLocationValues(newPosition.lat, newPosition.lng, streetName);
                    }
                } catch (error) {
                    console.error('Error al obtener la dirección:', error);
                }
            }
        if (navigator.geolocation) {

            getCurrentPosition();
        }
        return () => {
            map.remove();
        }
    }, []);

    return (
        <div className='col-md-6'> 
            <div id="mapa" style={{ height: '400px', width: '100%' }}></div>
            <h5 className='mt-3 font-weight-bold'>Puedes mover el marcador para buscar una dirección</h5> 
        </div>
    );
};

export default MapComponent;







