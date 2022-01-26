// js script for part 1 Exercise:
const ex = 29;

// Extended function from addLinesShape().
import { createSvg, addLinesShapeDifferentColor } from './task22.js';

// Reusing data from task 23.
const data = await d3.csv('../../data/part1/task23.csv');
// Task 26 data
const data2 = await d3.csv('../../data/part1/task26.csv');

// Append the svg element.
const svg = createSvg(data, ex);

// Line 1 with different colour points.
addLinesShapeDifferentColor(data, svg, d3.interpolatePuRd, 'triangle');

// Line 2.
addLinesShapeDifferentColor(data2, svg, d3.interpolateViridis, 'circle');