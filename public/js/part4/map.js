/**
 * Function would set up and draw the map.
 */
export async function setupMap() {
    // map constants
    const mapCenter = [30, 0];
    const mapZoom = 2;
    const mapLink = '<a href="http://openstreetmap.org/copyright">OpenStreetMap</a>';

    // create the map
    const map = L.map('map-container', {
        center: mapCenter, 
        zoom: mapZoom,
        maxZoom: 5,
        minZoom: 2
    });

    

    
    // add attributes for map
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: `&copy; ${mapLink} Contributors`
    }).addTo(map);
}