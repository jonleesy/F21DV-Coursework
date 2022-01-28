// js script for part 1 Exercise:
const ex = 20;

// Create Divs and button systematically using a general function.
import {createDiv} from './functions.js';
createDiv(ex);

// Data for bar chart.
const data = [10, 15, 20, 25, 30];

// Svg constants.
const width = 200, height = 200, margin = 20;

// Creating the svg object.
const svg = d3.select('.answerCenter')
                .append('svg')
                    .attr('width', width)
                    .attr('height', height);

// Define the horizontal scale.
const horScale = d3.scaleLinear()
                    .domain([0, d3.max(data)])
                    .range([0, 200 - margin * 2]);

// Define the vertical scale.
const verScale = d3.scaleLinear()
                    .domain([0, d3.max(data)])
                    .range([200 - margin * 2, 0]);

// Add Axis: https://www.d3-graph-gallery.com/graph/custom_axis.html
// x axis.
svg.append('g')
    .attr('transform', `translate(${margin}, ${height - margin})`)
    .call(d3.axisBottom(horScale).ticks(6));

// y axis.
svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`)
    .call(d3.axisLeft(verScale).ticks(6));

// Top axis.
svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`)
    .call(d3.axisTop(horScale).ticks(6))
    .style('color', 'blue');

// Right axis.
svg.append('g')
    .attr('transform', `translate(${width - margin}, ${margin})`)
    .call(d3.axisRight(verScale).ticks(6))
    .style('color', 'blue');