/**
 * @module this module sets up and controls the scatter plot section of the dashboard
 * @copyright Jonathan Lee 2022
 */

import { getGDPData, getHDIData, getPopulationData } from './data.js';
import { selectThisLine } from './line.js';

// local variables
let scatterSvg;
let plotWidth;
let plotHeight;
let colorScale;
let colorPopScale;
let circleScale;
let margin;

// data import
const hdiData = await getHDIData();
const gdpData = await getGDPData();
const populationData = await getPopulationData();

/**
 * funcitons sets up the scatter plot
 */
export async function setupScatter(selector) {
    // plot constants
    const width = 500;
    const height = 360;
    margin = {
        top: 20,
        right: 45,
        bottom: 45,
        left: 60
    };
    plotWidth = width - margin.left - margin.right;
    plotHeight = height - margin.top - margin.bottom;

    // add the svg
    scatterSvg = d3.select(`#${selector}`)
                    .append('svg')
                        .attr('width', plotWidth + margin.left + margin.right)
                        .attr('height', plotHeight + margin.top+ margin.bottom)
                        .append('g')
                            .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // add Label
    scatterSvg.append('text')
                .attr('transform', `translate(${-margin.left/4*3}, ${height*3/5}) rotate(-90)`)
                .style('font-size', '12px')
                .style('fill', 'white')
                .text('Human Development Index (HDI)');
    scatterSvg.append('text')
                .attr('transform', `translate(${width / 2 - margin.left*2}, ${height - margin.bottom/2})`)
                .style('font-size', '12px')
                .style('fill', 'white')
                .text('GDP Per Capita (\$)');

    // define the axes
    const horScale = d3.scaleLinear()
                        .domain(d3.extent(gdpData.map(d => parseFloat(d[window.year]))))
                        .range([0, plotWidth]);
    // hdi values for the year
    const yearHdi = hdiData.filter(d => d.Year == window.year);
    const verScale = d3.scaleLinear()
                        .domain(d3.extent(yearHdi.map(d => d.hdi)))
                        .range([plotHeight, 0]);
    circleScale = d3.scaleLinear()
                        .domain(d3.extent(populationData.map(d => d[window.year])))
                        .range([2, 2.5]);
    colorScale = d3.scaleSequential()
                        .domain([0, 1])
                        .interpolator(d3.interpolateYlOrRd);

    // add the axes
    scatterSvg.append('g')
        .attr('class', 'scatter-bottom-axes')
        .attr('transform', `translate(0, ${plotHeight})`)
        .call(d3.axisBottom(horScale));
    scatterSvg.append('g')
        .attr('class', 'scatter-left-axes')
        .call(d3.axisLeft(verScale));

    // call an update
    updateScatter();
}

/**
 * function updates the scatter plot
 */
export async function updateScatter() {
    // hdi values for the year
    const yearHdi = hdiData.filter(d => d.Year == window.year);

    // define the axes
    const horScale = d3.scaleLinear()
                        .domain([0, d3.extent(gdpData.map(d => parseInt(d[window.year])))[1] - 40000])
                        .range([0, plotWidth]);
    const verScale = d3.scaleLinear()
                        .domain(d3.extent(yearHdi.map(d => d.hdi)))
                        .range([plotHeight, 0]);
    circleScale = d3.scaleLinear()
                        .domain([0, 1000])
                        .range([2, 5]);
    colorPopScale = d3.scaleSequential()
                        .domain([0, 1000])
                        .interpolator(d3.interpolateYlOrRd);

    // re-call the axes.
    d3.selectAll('.scatter-bottom-axes')
        .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .call(d3.axisBottom(horScale))
            .selectAll('text')
                .attr('dy', '.35em')
                .attr('transform', 'rotate(-45)')
                .style('text-anchor', 'end');
    d3.selectAll('.scatter-left-axes')
        .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .call(d3.axisLeft(verScale));

    // add dots
    const u = scatterSvg.selectAll('circle')
                        .data(yearHdi);

    /**
     * mouseover function for each circle
     * @param {*} _ 
     * @param {*} d 
     */
    function mouseOver(_, d) {
        // get values
        const gdpCountry = gdpData.find(g => g['Country Code'] == d.Code);
        const gdpVal = gdpCountry[window.year];
        const countryName = gdpCountry['Country Name'];
        const populationDensity = populationData.find(p => p['Country Code'] == d.Code)[[window.year]];

        // add text
        addText(scatterSvg, countryName, 1);
        addText(scatterSvg, `GDP/Capita: ${Math.round(gdpVal * 1000) / 1000}`, 2);
        addText(scatterSvg, `HDI: ${Math.round(d.hdi * 1000) / 1000}`, 3);
        addText(scatterSvg, `Population Density: ${Math.round(populationDensity * 1000) / 1000}`, 4);

        blurAllScatter();

        // focus this
        d3.select(this)
            .attr('opacity', 1.0);
        
        selectThisLine(d.Code);

        // unblur country
        d3.select(`.map-path-${d.Code}`)
            .attr('fill-opacity', 1.0);
    }

    // enter-append function
    u.enter()
        .append('circle')
            .on('mouseover', mouseOver)
            .on('mouseout', (_, d) => {
                // remove scatter tooltip
                d3.selectAll('.scatter-temp-text')
                    .remove();

                // revert circles
                d3.selectAll('.scatter-circle')
                    .attr('opacity', 0.6)

                // revert line
                d3.select(`#hdi-line-${d.Code}`)
                    .attr('stroke', 'rgb(222, 222, 222')
                    .attr('stroke-width', '1px')
                    .attr('opacity', 0.1);

                // unselect on map
                d3.selectAll(`.map-path-${d.Code}`)
                    .attr('fill-opacity', 0.6);
                
            })
        .merge(u)
        .transition()
            .duration(400)
                .attr('r', d => {
                    const populationDensity = populationData.find(p => p['Country Code'] == d.Code);

                    if (circleScale(populationDensity[parseFloat(window.year)]) > 5) { return 6; }
                    return (populationDensity[window.year]) ? circleScale(populationDensity[parseFloat(window.year)]) : 0;
                })
                .attr('transform', d => {
                    const gdpCountry = gdpData.find(g => g['Country Code'] == d.Code);
                    const gdpVal = gdpCountry[window.year];
                    const hdiVal = d.hdi;

                    return (gdpVal && hdiVal) ? `translate(${horScale(gdpVal)}, ${verScale(hdiVal)})` : `scale(0)`;
                })
                .style('fill', d => {
                    const populationDensity = populationData.find(p => p['Country Code'] == d.Code);
                    return (populationDensity[window.year]) ? colorPopScale(populationDensity[parseFloat(window.year)]) : 0;
                })
                .attr('opacity', 0.6)
                .attr('stroke', d => colorScale(d.hdi))
                .attr('stroke-width', '0.3px')
                .attr('class', 'scatter-circle')
                .attr('id', d => `scatter-${d.Code}`);

    // remove extra stuff
    u.exit()
        .transition()
                .duration(400)
                .remove();
    
}

/**
 * function can be called and would blur all scatter plot's dots
 */
export function blurAllScatter() {
    // blur everything
    d3.selectAll('.scatter-circle')
        .attr('opacity', 0.1);
}

/**
 * function to add text to tooltip
 * @param {*} selector where to add this
 * @param {*} text what text to add on the ith line
 * @param {*} i the ith line to add
 */
export function addText(selector, text, i) {
    selector.append('text')
            .attr('class', 'scatter-temp-text')
            .attr('dy', '.35em')
            .attr('transform', `translate(50, ${i * 15 + plotHeight - margin.bottom * 2})`)
            .style('font-size', () => (i == 1) ? '15px' : '12px')
            .style('fill', 'white')
            .html(`${text}`);
}