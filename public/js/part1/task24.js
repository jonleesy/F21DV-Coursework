// js script for part 1 Exercise:
const ex = 24;

// Import svg and line function from task22.js
import { createSvg, addLines } from './task22.js';

// Creating the sine and cosine data points.
const n = 100;
const sine = new Array(), cosine = new Array();
for (let i = 0; i < n; i++) {
    sine.push({x: i/100, y: Math.sin( 6.2 * i/100)});
    cosine.push({x: i/100, y: Math.cos( 6.2 * i/100)});
}

const middleLine = [{x:0, y:0}, {x:1, y:0}]

// Append the svg element
const svg = createSvg(sine, ex);
addLines(sine, svg, 'green');
addLines(cosine, svg, 'blue');
addLines(middleLine, svg, 'red');