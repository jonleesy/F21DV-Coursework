import { getGDPData, getHDIData, getPopulationData } from "./data.js";

// local variables
let scatterSvg;
let plotWidth;
let plotHeight;
const hdiData = await getHDIData();
const gdpData = await getGDPData();
const populationData = await getPopulationData();

// function getHorScale() {
//     const horScale = 
// }

export async function setupScatter() {
    // plot constants
    const width = 500;
    const height = 360;
    const margin = {
        top: 20,
        right: 10,
        bottom: 45,
        left: 60
    };
    plotWidth = width - margin.left - margin.right;
    plotHeight = height - margin.top - margin.bottom;

    // add the svg
    scatterSvg = d3.select('#top-right-container')
                    .append('svg')
                        .attr('width', plotWidth + margin.left + margin.right)
                        .attr('height', plotHeight + margin.top+ margin.bottom)
                        .append('g')
                            .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // add Label
    scatterSvg.append('text')
                .attr('transform', `translate(${-margin.left/4*3}, ${height/2}) rotate(-90)`)
                .style('font-size', '12px')
                .text('GDP Per Capita (\$)');
    scatterSvg.append('text')
                .attr('transform', `translate(${width / 2 - margin.left*2}, ${height - margin.bottom/2})`)
                .style('font-size', '12px')
                .text('Human Development Index (HDI)');

    // define the axes
    const horScale = d3.scaleLinear()
                        .domain(d3.extent(gdpData.map(d => d[window.year])))
                        .range([0, plotWidth]);
    // hdi values for the year
    const yearHdi = hdiData.filter(d => d.Year == window.year);
    const verScale = d3.scaleLinear()
                        .domain(d3.extent(yearHdi.map(d => d.hdi)))
                        .range([plotHeight, 0]);
    const circleScale = d3.scaleLinear()
                        .domain(d3.extent(populationData.map(d => d[window.year])))
                        .range([2, 2.5]);
    const colorScale = d3.scaleSequential()
                        .domain([0, d3.extent(yearHdi.map(d => d.hdi))[1]])
                        .interpolator(d3.interpolateYlOrRd);

    // add the axes
    scatterSvg.append('g')
        .attr('class', 'scatter-bottom-axes')
        .attr('transform', `translate(0, ${plotHeight})`)
        .call(d3.axisBottom(horScale));
    scatterSvg.append('g')
        .attr('class', 'scatter-left-axes')
        .call(d3.axisLeft(verScale));

    // add dots
    scatterSvg.selectAll('circle')
            .data(yearHdi)
            .enter()
                .append('circle')
                .attr('r', d => {
                    console.log(d.Code)
                    const populationDensity = populationData.find(p => p['Country Code'] == d.Code);
                    return circleScale(populationDensity[window.year]);
                })
                .attr('transform', d => {
                    const gdpCountry = gdpData.find(g => g['Country Code'] == d.Code);
                    const gdpVal = gdpCountry[window.year];
                    const hdiVal = d.hdi;

                    return `translate(${horScale(gdpVal)}, ${verScale(hdiVal)})`;
                })
                .style('fill', d => colorScale(d.hdi))
                .attr('opacity', 0.6)
                .attr('stroke', d => colorScale(d.hdi))
                .attr('stroke-width', '0.3px')
}

export async function updateScatter() {
    // hdi values for the year
    const yearHdi = hdiData.filter(d => d.Year == window.year);

    // define the axes
    const horScale = d3.scaleLinear()
                        .domain(d3.extent(gdpData.map(d => d[window.year])))
                        .range([0, plotWidth]);
    const verScale = d3.scaleLinear()
                        .domain(d3.extent(yearHdi.map(d => d.hdi)))
                        .range([plotHeight, 0]);
    const circleScale = d3.scaleLinear()
                        .domain(d3.extent(populationData.map(d => d[window.year])))
                        .range([0, 10]);

    // re-call the axes.
    d3.selectAll('.scatter-bottom-axes')
        .transition()
            .duration(400)
            .ease(d3.easeLinear)
            .call(d3.axisBottom(horScale))
    d3.selectAll('.scatter-left-axes')
        .transition()
            .duration(400)
            .ease(d3.easeLinear)
            .call(d3.axisLeft(verScale))

}