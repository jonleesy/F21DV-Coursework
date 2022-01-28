// js script for part 1 Exercise:
const ex = 32;

// Import svg and line function from task22.js
import { createSvg, addLines, addLinesShape } from './task22.js';

// Import data for task 23.
const data = await d3.csv('../../data/part1/task23.csv');

// Append the svg element
const svg = createSvg(data, ex);

// Add the picture
svg.svg
    .append('svg:image')
    .attr('xlink:href', '../../data/part1/task32.png')
    .attr('width', 320)
    .attr('height', 320)

// Add line on top of pic.
addLinesShape(data, svg, 'steelblue', 'circle');