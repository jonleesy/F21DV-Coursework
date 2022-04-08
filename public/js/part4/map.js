/**
 * @module module aims at setting up the map, and updating it on change
 * @copyright Jonathan Lee 2022
 */

// local imports
import { getGeoJson, getHDIData, getGDPData, getPopulationData } from './data.js';
import { selectThisLine } from './line.js';
import { blurAllScatter, addText } from './scatter.js';

// global varianles
window.year = 2017;

// data constants
const gdpData = await getGDPData();
const populationData = await getPopulationData();

// local variables
let map;
let dataLayer;
let hdiValues;
let averageHdi;

// call datasets
let geoJsonData = await getGeoJson();
let hdiData = await getHDIData();

// colour scale
const mapColourScale = d3.scaleSequential()
                        .domain(d3.extent(hdiData.map(d => d.hdi)))
                        .interpolator(d3.interpolateYlOrRd);

/**
 * function updates the tooltip
 * @param {*} name name of country
 * @param {*} value hdi value of country
 */
function updateTooltip(name, value) {
    // rename tooltip name
    d3.select('#tooltip-name')
        .html(`${name}<br>`);

    // rename tooltip value
    d3.select('#tooltip-value')
        .html(() => (typeof value == 'string') ? 'no data' : Math.round(value * 1000) / 1000);
}

/**
 * function controls mouseover action
 * @param {*} e event
 */                        
function mouseOver(e) {
    // get the country id
    const { target } = e;
    const countryid = target.feature.id;

    // highlight the country
    target.setStyle({
        fillOpacity: 1.0,
    })

    // filter for data
    const countryData = hdiData.find(d => d.Code == countryid && d.Year == window.year);
    const countryName = (target.feature.properties.name) ? target.feature.properties.name : 'no data';
    const countryVal = (countryData) ? parseFloat(countryData.hdi) : 'no data';

    // update tooltip
    updateTooltip(countryName, countryVal);

    // process scatter
    blurAllScatter();
    
    // select specific scatter
    d3.select(`#scatter-${countryid}`)
        .attr('opacity', 1.0);

    // constants
    const gdpCountry = gdpData.find(g => g['Country Code'] == countryid);
    const gdpVal = gdpCountry ? gdpCountry[window.year] : 'no data';
    const populationDensity = (populationData.find(p => p['Country Code'] == countryid)) ? populationData.find(p => p['Country Code'] == countryid)[[window.year]] : 'no data';

    // add text back to scatter
    const selected = d3.select('#top-right-container svg g')
    addText(selected, countryName, 1);
    addText(selected, `GDP/Capita: ${(Math.round(gdpVal)) ? Math.round(gdpVal * 1000) / 1000 : 'no data'}`, 2);
    addText(selected, `HDI: ${countryVal}`, 3);
    addText(selected, `Population Density: ${(Math.round(populationDensity)) ? Math.round(populationDensity * 1000) / 1000 : 'no data'}`, 4);

    // process lines
    selectThisLine(countryid);
}

/**
 * function controls mouseleave action
 * @param {*} e event
 */         
function mouseLeave(e) {
    const { target } = e;

    // unstyle the selection
    target.setStyle({
        fillOpacity: 0.6,
    })

    // update tooltip
    updateTooltip('World', averageHdi);

    // unblur scatter
    d3.selectAll('.scatter-circle')
        .attr('opacity', 0.6);

    // remove scatter tooltip
    d3.selectAll('.scatter-temp-text')
        .remove();

    // revert line
    d3.selectAll(`.hdi-line`)
        .attr('stroke', 'rgb(222, 222, 222')
        .attr('stroke-width', '1px')
        .attr('opacity', 0.1);
}

/**
 * function sets the default map style
 * @param {*} feature 
 * @returns 
 */
function defaultMapSettings(feature) {
    // use the layer's country code to filter for data
    const countryCode = feature.id;
    const countryLatestHdi = hdiValues.find(d => d.Code == countryCode);

    // 'undefined' check
    const colour = (countryLatestHdi) ? mapColourScale(countryLatestHdi.hdi) : 'grey';

    // Return styling
    return {
        color: colour, weight: 0.5, fillOpacity: 0.6, className: `map-path-${countryCode}`
    };
}

/**
 * default function for map's onEachFeature
 * @param {*} _ dummy 
 * @param {*} layer on maps
 */
function onEachFeature(_, layer) {
    layer.on({
        // click: onClick,
        mouseover: mouseOver,
        mouseout: mouseLeave
    })
}

/**
 * function updates the map
 */
export async function updateMap() {
    // HDI values for the year
    hdiValues = hdiData.filter(d => d.Year == window.year);

    // add mapjson layer
    dataLayer.remove();
    dataLayer = L.geoJson(geoJsonData, {
        onEachFeature: onEachFeature,
        style: defaultMapSettings
        });
    dataLayer.addTo(map);

    // add bounds
    map.setMaxBounds(dataLayer.getBounds());
}

/**
 * Function would set up and draw the map
 */
export async function setupMap() {
    // HDI values for the year
    hdiValues = hdiData.filter(d => d.Year == window.year);

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

    // add mapjson layer
    dataLayer = L.geoJson(geoJsonData, {
        onEachFeature: onEachFeature,
        style: defaultMapSettings
        });
    dataLayer.addTo(map);

    // update map
    updateMap();

    // define the legend
    const legend = L.control({position: 'topright'});

    // define the legend
    legend.onAdd = () => {
        // create the legend div
        const div = L.DomUtil.create('div', 'info legend');

        // index: only between 0.0 - 1.0
        const legendData = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
        const lengendLabels = [` ${legendData[0]} - ${legendData[1]} `,
                                ` ${legendData[1]} - ${legendData[2]} `,
                                ` ${legendData[2]} - ${legendData[3]} `,
                                ` ${legendData[3]} - ${legendData[4]} `,
                                ` ${legendData[4]} ++ `];

        // add the title
        d3.select(div)
            .append('span')
                .html('<strong>HDI</strong> <br>')

        // add the legend
        for (let i = 0; i < lengendLabels.length; i++) {
            const selected = d3.select(div);

            // add the color box
            selected.append('i')
                .style('background', mapColourScale(legendData[i]));

            // add the label
            d3.select(div)
                .append('span')
                    .html(() => {
                        const msg = (i == legendData - 1) ? '' : '<br>';
                        return `${lengendLabels[i]} ${msg}`;
                    })
        }

        return div;
    }

    // add legend to map
    legend.addTo(map);

    // add tooltip
    const tooltip = L.control({position: 'bottomleft'});

    // define the tooltip
    tooltip.onAdd = () => {
        const div = L.DomUtil.create('div', 'info');

        // add the title
        d3.select(div)
            .append('span')
                .html('<strong>Human Development Index (HDI)</strong><br>')

        // add the name
        d3.select(div)
            .append('span')
                .attr('id', 'tooltip-name')
                .html('World<br>')

        // calculate average hdi
        const hdiValueArr = hdiValues.map(d => d.hdi);
        let sumHdi = 0;
        for (let item of hdiValueArr) {
            sumHdi = sumHdi + parseFloat(item);
        }
        
        averageHdi = Math.round((sumHdi / hdiValueArr.length) * 1000) / 1000;
        
        // add the number
        d3.select(div)
            .append('span')
                .attr('id', 'tooltip-value')
                .html(`${averageHdi}`);

        return div;
    }

    // add the tooltip
    tooltip.addTo(map);
    
    // add attributes for map
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: `&copy; ${mapLink} Contributors`
    }).addTo(map);
}