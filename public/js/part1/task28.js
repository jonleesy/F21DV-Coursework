// js script for part 1 Exercise:
const ex = 28;

// Create Divs and button systematically using a general function.
import {createDiv} from '../functions.js';
createDiv(ex);

// Data for bar chart.
const data = [50, 400, 300, 900, 250, 1000];

// Svg constants
const width = 200, barHeight = 20, margin = 2;

// Creating the svg object.
const svg = d3.select('.answerCenter')
                .append('svg')
                    .attr('width', width)
                    .attr('height', barHeight * data.length);

// Define the x-axis.
const xScale = d3.scaleLinear()
                    .domain([d3.min(data), d3.max(data)])
                    .range([30, 200]);

// Add 'g' object.
const g = svg.selectAll('g')
            .data(data)
            .enter()
                .append('g')
                    .attr('transform', (_, i) => `translate(0, ${i * barHeight})`);

// Colour Scale.
const boxCol = d3.scaleSequential()
                    .domain(d3.extent(data))
                    .interpolator(d3.interpolatePuRd);
const textCol = d3.interpolateRgb('steelblue', 'white');

// Add 'rect' elements.
g.append('rect')
    .attr('width', d => xScale(d))
    .attr('height', barHeight - margin)
    .attr('fill', d => boxCol(d));

// Add text object to rectangle.
g.append('text')
    .attr('x', d => xScale(d))
    .attr('y', barHeight/2)
    .attr('dy', '.25em')
    .style('text-anchor', 'end')
    .text(d => d)
    .style('fill', d => textCol(d/1000));