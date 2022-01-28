// js script for part 1 Exercise:
const ex = '30 \& 31';

// Create Divs and button systematically using a general function.
import {createDiv} from './functions.js';
createDiv(ex);

// Create and array of numebers. Remove '0'.
const [, ... data] = Array.from({length: 14}, (_, i) => i + 1);

// Svg dimension constants.
const xSize = 400, ySize = 400, margin = 40, xMax = xSize - margin*2, yMax = ySize - margin*2;

// Increasing the size of the answer container
d3.select('.container').style('height', `${ySize}px`);
d3.select('.answerCenter').style('width', `${xSize}px`);

// Svg Object.
const svg = d3.select('.answerCenter')
                .append('svg')
                .attr('width', xSize)
                .attr('height', ySize)
                .append('g')
                .attr('transform', `translate(${xSize/2}, ${ySize/2})`);

// Radius
const radius = Math.min(xSize, ySize) / 2;

// Color Scale
const colorScale = d3.scaleSequential()
                        .domain(d3.extent(data))
                        .interpolator(d3.interpolateSinebow);

// Create pi.
const pie = d3.pie();
const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

// Generate Groups.
const arcs = svg.selectAll('arc')
                .data(pie(data))
                .enter()
                    .append('g')
                    .attr('class', 'arc')

// Draw arc paths.
arcs.append('path')
    .attr('fill', (_, i) => colorScale(i))
    .attr('stroke', 'black')
    .attr('stroke-width', 0.1)
    .attr('d', arc)

// Add arc's text.
arcs.append('text')
    .text(d => d.data)
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .style('text-anchor', 'middle')
    .style('font-size', 10)
