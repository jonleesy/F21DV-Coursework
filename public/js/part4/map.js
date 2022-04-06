// local imports
import { getGeoJson, getHDIData } from './data.js';

// local variables
let map;
let dataLayer;
let geoJsonData;
let hdiData;

/**
 * Function would set up and draw the map
 */
export async function setupMap() {
    // map constants
    const mapCenter = [30, 0];
    const mapZoom = 2;
    const mapLink = '<a href="http://openstreetmap.org/copyright">OpenStreetMap</a>';

    // create the map
    map = L.map('map-container', {
        center: mapCenter, 
        zoom: mapZoom,
        maxZoom: 5,
        minZoom: 2,
        maxBoundsViscosity: 0.5,
    });

    // call datasets
    geoJsonData = await getGeoJson();
    hdiData = await getHDIData();
    const latestHDI = hdiData.filter(d => d.Year == 2017);

    // colour scale
    const mapColourScale = d3.scaleSequential()
                            .domain(d3.extent(latestHDI.map(d => d.hdi)))
                            .interpolator(d3.interpolateYlOrRd);

    // add mapjson layer
    dataLayer = L.geoJson(geoJsonData, {
        onEachFeature: (f, L) => {
            L.on({
                // click: onclick,
                mouseover: mouseOver,
                // mouseout: mouseLeave
            })
        }
        ,
        style: f => {
            // use the layer's country code to filter for data
            const countryCode = f.properties.ADM0_A3;
            const countryLatestHdi = latestHDI.find(d => d.Code == countryCode);
            
            // 'undefined' check
            const colour = (countryLatestHdi) ? mapColourScale(countryLatestHdi.hdi) : 'grey';
            
            // Return styling
            return {
                color: colour, weight: 0.5, fillOpacity: 0.8
            };
        }
    })
    dataLayer.addTo(map);

    // add bounds
    map.setMaxBounds(dataLayer.getBounds());
    
    // add attributes for map
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: `&copy; ${mapLink} Contributors`
    }).addTo(map);
}