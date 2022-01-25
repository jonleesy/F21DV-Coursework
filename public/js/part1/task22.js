// js script for part 1 Exercise:
const ex = 22;

// Create Div Systematically using a genral function.
import {createDiv, createButton} from './functions.js';;

/**
 * Creates and appends the SVG and its axes.
 * @param {*} data data of plots
 * @returns Svg element, the X and Y axis scaler.
 */
export function createSvg(data, task) {

    // Setting up div
    createDiv(task)

    // Svg dimension constants.
    const xSize = 400, ySize = 400, margin = 40, xMax = xSize - margin*2, yMax = ySize - margin*2;

    // Increasing the size of the answer container
    d3.select('.container').style('height', `${ySize}px`);
    d3.select('.answerCenter').style('width', `${xSize}px`);

    // limits of data.
    const xExtent = d3.extent(data, d => d.x);
    const yExtent = d3.extent(data, d => d.y);

    // Create and apend the svg object.
    const svg = d3.select('.answerCenter')
                    .append('svg')
                        .attr('width', xSize)
                        .attr('height', ySize)
                        .append('g')
                            .attr('transform', `translate(${margin}, ${margin})`);

    // Define the horizontal scale.
    const horScale = d3.scaleLinear()
                        .domain([xExtent[0], xExtent[1]])
                        .range([0, xMax]);

    // Define the vertical scale.
    const verScale = d3.scaleLinear()
                        .domain([yExtent[0], yExtent[1]])
                        .range([yMax, 0]);

    // Add Axis: https://www.d3-graph-gallery.com/graph/custom_axis.html
    // x axis.
    svg.append('g')
        .attr('transform', `translate(0, ${yMax})`)
        .call(d3.axisBottom(horScale));

    // y axis.
    svg.append('g')
        .call(d3.axisLeft(verScale));

    // Top axis.
    svg.append('g')
        .call(d3.axisTop(horScale))
        .style('color', 'blue');

    // Right axis.
    svg.append('g')
        .attr('transform', `translate(${xMax}, 0)`)
        .call(d3.axisRight(verScale))
        .style('color', 'blue');

    return {svg, horScale, verScale};
}
 
/**
 * Function that adds a line to the SVG object. 
 * @param {*} data Same data as createSvg().
 * @param {*} svgObj the created SVG Object.
 * @param {*} color colour for each line.
 */
export function addLines(data, svg, color) {
    // Create and adds the lines
    svg.svg
        .append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('d', d3.line()
                    .x(d => svg.horScale(d.x) )
                    .y(d => svg.verScale(d.y))
                    )
}