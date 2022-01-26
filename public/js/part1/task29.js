// js script for part 1 Exercise:
const ex = 29;

// Import create button function.
import { createButton } from './functions.js';

// Import svg and line function from task22.js
import { createSvg, addLinesShapeDifferentColor, addLinesCoor } from './task22.js';

// Reusing data from task 23.
const data = await d3.csv('../../data/part1/task23.csv');
// Task 26 data
const data2 = await d3.csv('../../data/part1/task26.csv');

// Append the svg element
const svg = createSvg(data, ex);

// Line 1
addLinesShapeDifferentColor(data, svg, d3.interpolatePuRd, 'triangle');

// Line 2
addLinesShapeDifferentColor(data2, svg, d3.interpolateViridis, 'circle');

// Modify container height.
d3.select('.container').style('height', '430px')