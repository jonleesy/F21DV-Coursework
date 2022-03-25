// Functions import.
import { createDivs } from './functions.js';
import { mapData, getLatestCase, round2Decimal, getCountryData } from './data.js';
import { plotGraph1, updateGraph } from './graph.js';
import { clusterGraph } from './cluster.js';
import { populateOthersDiv } from './others.js';

// Add the center grid container.
d3.select('body')
    .append('div')
        .attr('class', 'grid-container');

// Add the div's for:
// Top Map Panel,
createDivs('grid-container', 'map-container');
// Cliuster Panel
createDivs('grid-container', 'cluster-container');
// Bottom Left Panel,
createDivs('grid-container', 'graph-container', 'graph1');
// Bottom Middle Panel.
createDivs('grid-container', 'graph-container', 'graph2');
// Bottom Right Panel.
createDivs('grid-container', 'graph-container', 'others-container');

// Datas.
const dataMap = await mapData();
const dataCase = await getLatestCase();

// Process outlier.
const dataCasePerMilFloat = dataCase.map(v => parseFloat(v[1]));
const latestCaseMax = d3.quantile(dataCasePerMilFloat, 0.9);

// World Data.
const worldLatest = dataCase.find(v => v[0] == 'OWID_WRL');
const worldCasesPerMil = worldLatest[1];
const worldNewCases = worldLatest[3];
let typeConst = 'new_cases', typeConst2 = 'new_cases_smoothed';
let countryConst = 'OWID_WRL';
let countryNameConst = 'World';

// Options Data. To populate dorpdown options
const optionsData = await d3.csv('../../data/part3/variable.csv');

// Dashboard constants.
const transitionDuration = 200;

//::::::::::::::::::
// Starting the map
// Map Svg Constants.
const width = 900;
const height = 420;
const mapMargin = { top: 10,
                    right: 10,
                    bottom: 10, 
                    left: 10 };
const mapWidth = width - mapMargin.left - mapMargin.right;
const mapHeight = height - mapMargin.top - mapMargin.bottom;
const projectionScale = 170;

// Add Map Svg.
const mapSvg = d3.select('.map-container')
                    .append('svg')
                        .attr('class', 'mapsvg')
                        .attr('width', mapWidth + mapMargin.left + mapMargin.right)
                        .attr('height', mapHeight + mapMargin.top + mapMargin.bottom)
                        // Use a group object.
                        .append('g')

// Colour Scales.
const mapDomain = [0, latestCaseMax];
const mapColourScale = d3.scaleSequential()
                            .domain(mapDomain)
                            .interpolator(d3.interpolateYlOrRd);

// For circles on the map – scale.
const circleScale = d3.scaleLinear()
                            .domain(mapDomain)
                            .range([1, 5]);

// Draw the map;
Promise.all(dataMap).then(topo => {

    // Use a projection to convert 'Coordinates' to 'pixels'.
    const mapProjection = d3.geoEqualEarth()
                            .scale(projectionScale)
                            // Adjust for translated top-margin in svg.
                            .center([0, mapMargin.top])
                            // Adjust for translated left-margin in svg.
                            .translate([mapWidth / 2 - mapMargin.left - mapMargin.right,
                                        mapHeight / 2]);

    // Mouse over function.
    const mouseOver = (_, d) => {
        const newTolltipData = dataCase.find(data => data[0] == d.id);
        const newCountry = newTolltipData[2];
        const newCasesPerMil = newTolltipData[1];
        const newCases = newTolltipData[3];

        // Blur the rest
        d3.selectAll('.map')
            .transition()
            .duration(transitionDuration)
            .style('opacity', 0.4)
            .attr('stroke-width', '0.5px')
        
        // Blue except the selected
        d3.select(this)
            .transition()
            .duration(transitionDuration)
            .style('opacity', 1.0)
            .attr('stroke-width', '1px')

        // Rename Tooltips
        d3.select('.tooltip-country')
            .text(newCountry)
        d3.select('.tooltip-cases-per-mil')
            .text(newCasesPerMil)
        d3.select('.tooltip-new-cases')
            .text(newCases)
    }

    // Mouse Leave Function.
    const mouseLeave = () => {
        // Unblur Everything
        d3.selectAll('.map')
            .transition()
            .duration(transitionDuration)
            .style('opacity', 1.0)
        
        // Undo Stroke-width.
        d3.select(this)
            .transition()
            .duration(transitionDuration)
            .attr('stroke-width', '0.5px')
            .style('opacity', 1.0)

        // Rename Tooltips
        d3.select('.tooltip-country')
            .text(worldLatest[2])
        d3.select('.tooltip-cases-per-mil')
            .text(worldCasesPerMil)
        d3.select('.tooltip-new-cases')
            .text(worldNewCases)
    }

    // onClick function for each country.
    const click = async (_, d) => {

        // Get the country id.
        countryConst = d.id;

        // Get the data for this country.
        const thisdata = await getCountryData(d.id);

        // Filter to get country's name, to update name div.
        countryNameConst = thisdata.find(k => k.location);

        // Update the graphs.
        updateGraph(thisdata, typeConst, 'graph1');
        updateGraph(thisdata, typeConst2, 'graph2');

        // Check and show if no data.
        if (thisdata.length == 0) {
            d3.selectAll('.graph-container span')
                .text(`${d.properties['name']} **No Data`);
        } else {
            d3.selectAll('.graph-container span')
                .text(d.properties['name']);
        }
    }

    // Plot the map and colours
    mapSvg.append('g')
            .selectAll('path')
            .data(topo[0].features)
            .enter()
                .append("path")
                .attr('d', d3.geoPath().projection(mapProjection))
                // fill colours
                .attr('fill', d => {

                    // Use data's id to match and find the number of cases
                    let cases = dataCase.find(data => data[0] == d.id);

                    // Process NaN
                    let total = cases ? cases[1] : 0;
                    if (total == 'no data') {
                        total = 0;
                    }

                    // Return the colours.
                    return mapColourScale(parseFloat(total));
                })
                .attr('stroke', 'black')
                .attr('stroke-width', '0.5px')
                .attr('class', 'map')
            .on('mouseover', mouseOver)
            .on('mouseleave', mouseLeave)
            .on('click', click)
    
    // Plot the circles
    mapSvg.append('g')
            .selectAll('path')
            .data(topo[0].features)
            .enter()
                .append('circle')
                .attr('r', d => {
                    
                    // Use data's id to match and find the number of cases
                    let cases = dataCase.find(data => data[0] == d.id);

                    // Process NaN
                    let total = cases ? cases[1] : 0;
                    if (total == 'no data') {
                        total = 0;
                    }
                    
                    // Return the colours.
                    return circleScale(parseFloat(total));
                })
                .attr('transform', d => {
                    try {
                        const coor = d.geometry.coordinates;
                        let translateCoor;
                        if (coor.length > 1) {
                            // console.log(3, coor[0])
                            translateCoor = (mapProjection(turf.centerOfMass(turf.polygon(coor[0])).geometry.coordinates));
                        } else {
                            translateCoor = (mapProjection(turf.centerOfMass(turf.polygon(coor)).geometry.coordinates));
                        }
                        return `translate(${translateCoor[0]},${translateCoor[1]})`;
                    } catch (error) {
                    }
                })
                .style('fill', d => {

                    // Use data's id to match and find the number of cases
                    let cases = dataCase.find(data => data[0] == d.id);

                    // Process NaN
                    let total = cases ? cases[1] : 0;
                    if (total == 'no data') {
                        total = 0;
                    }

                    // Return the colours.
                    return mapColourScale(parseFloat(total));
                })
                .attr('opacity', .4)
                .attr("pointer-events", "none")
                .attr('stroke', 'black')
});

// Legend Data.
const legendData = [0,
                    round2Decimal(d3.quantile(dataCasePerMilFloat, 0.25)),
                    round2Decimal(d3.quantile(dataCasePerMilFloat, 0.5)),
                    round2Decimal(d3.quantile(dataCasePerMilFloat, 0.75)),
                    round2Decimal(latestCaseMax)];
const lengendLabels = [`${legendData[0]} - ${legendData[1]}`,
                        `${legendData[1]} - ${legendData[2]}`,
                        `${legendData[2]} - ${legendData[3]}`,
                        `${legendData[3]} - ${legendData[4]}`,
                        `${legendData[4]} ++`];
                        
// Legend Constants.
const legendX = mapMargin.left * 3;
const legendY = mapHeight*(3/4);

// Add Legend Group to map.
mapSvg.append('g')
        .attr('class', 'map-legend')
        .attr('transform', `translate(${legendX}, ${legendY})`)
            .append('rect')
            .attr('fill', 'white')
            .attr('opacity', 0.5)
            .attr('transform', `translate(${-mapMargin.left}, ${-mapMargin.top*2})`);

// Draw the legend.
const mapLegend = d3.legendColor()
                .labels(lengendLabels)
                .title('Cases Per Million')
                .scale(mapColourScale);
mapSvg.select('.map-legend')
        .call(mapLegend);

// Add a tooltip.
const tooltipRectHeight = 20;
const mapTooltip = mapSvg.append('g')
                        .attr('class', 'tooltip')
                        .attr('transform', `translate(${mapWidth - 110}, ${mapMargin.top*2})`);

const addToolTipRect = (translateY, text, className = '') => {
    mapTooltip.append('rect')
                .attr('fill', 'white')
                .attr('opacity', 0.5)
                .attr('transform', `translate(0, ${translateY})`);
    mapTooltip.append('text')
                .attr('class', className)
                .attr('x', 5)
                .attr('y', translateY + tooltipRectHeight/2)
                .attr('dy', '.35em')
                .text(text);
}

// Title tooltip
addToolTipRect(0, worldLatest[2], 'tooltip-country');
addToolTipRect(tooltipRectHeight, 'Cases Per Million:');
addToolTipRect(tooltipRectHeight * 2, worldCasesPerMil, 'tooltip-cases-per-mil');
addToolTipRect(tooltipRectHeight * 3, 'New Cases:');
addToolTipRect(tooltipRectHeight * 4, worldNewCases, 'tooltip-new-cases');

// ::::::::::::::::::::::::::::::
// Starting the graphs
window.worldData = await getCountryData('OWID_WRL');

// Add the first graph for graph1.
plotGraph1(worldData, typeConst, 'graph1');
updateGraph(worldData, typeConst, 'graph1');

// Add the first graph for graph2.
plotGraph1(worldData, typeConst2, 'graph2');
updateGraph(worldData, typeConst2, 'graph2');

// Add a dropdown option for each graph
const addOptions = (selector) => {
    
    // Add a dropdown menu
    const optionsDiv1 = d3.select(`#${selector}`)
                        .append('select')
                            .attr('id', `select-button-${selector}`)

    // Add a span that shows country name.                        
    d3.select(`#${selector}`)
        .append('span')
        .attr('id', `${selector}-text`)
        .text(countryNameConst);

    // Populate Options
    optionsDiv1.selectAll(`.${selector} myOptions`)
                .data(optionsData)
                .enter()
                    .append('option')
                    .text(d => d.display)
                    .attr('value', d => d.value)
                    .attr('id', (d) => {
                        if (selector == 'graph1') {
                            if (d.value == typeConst) {
                                return `${selector}-default-option`;
                            }
                        } else {
                            if (d.value == typeConst2) {
                                return `${selector}-default-option`;
                            }
                        }
                    })
                    .property('selected', (d) => {
                        if (selector == 'graph1') {
                            if (d.value == typeConst) {
                                return 'selected'
                            }
                        } else {
                            if (d.value == typeConst2) {
                                return 'selected'
                            }
                        }
                    })

    // Process on-change event
    d3.select(`#select-button-${selector}`)
        .on('change', async () => {
            if (selector == 'graph1') {
                typeConst = d3.select(this).property('value');
                updateGraph(await getCountryData(countryConst), typeConst, `${selector}`)
            } else {
                typeConst2 = d3.select(this).property('value');
                updateGraph(await getCountryData(countryConst), typeConst2, `${selector}`)
            }
        })
}

/// Add dropdown options for graph.
addOptions('graph1');
addOptions('graph2');

// Add graph that shows cluster.
clusterGraph('cluster-container', 400, 400, dataCase);

// Populate the bottom right div
populateOthersDiv();