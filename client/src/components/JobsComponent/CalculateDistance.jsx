
// Función para calcular la distancia en kilómetros entre dos puntos en la tierra
export function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radio de la tierra en kilómetros
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

// Función para convertir grados a radianes
export function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}