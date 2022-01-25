// js script for part 1 Exercise:
const ex = 23;

// Import svg and line function from task22.js
import { createSvg, addLines } from './task22.js';

// Import data for task 23.
const data = await d3.csv('../../data/part1/task23.csv');

// Append the svg element
const svg = createSvg(data, ex);
addLines(data, svg, 'steelblue');