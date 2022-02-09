// .js script for exercise:
const ex = 1;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';
import { createSvg } from './sharedFunction.js';

// Reuse datapoints from Lab 1
const data = await d3.csv('../../data/part1/task23.csv');

// Creating base <div>s systematically
createAnswerDiv(ex);

// Create the Svg
const svg = createSvg(data);

// Add Lines.
svg.svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('d', d3.line()
            .x(d => svg.horScale(d.x))
            .y(d => svg.verScale(d.y)));

// Add Circles
svg.svg.selectAll('circle')
    .data(data)
    .enter()
        // Using a dummy so that circle would not translate during hover action.
        .append('g')
            .attr('transform', d => `translate(${svg.horScale(d.x)}, ${svg.verScale(d.y)})`)
            .append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', 5)
                .attr('class', 'pulse')
                .attr('stroke', 'black')
                .attr('fill', 'red');