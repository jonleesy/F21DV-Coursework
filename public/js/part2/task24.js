// .js script for exercise:
const ex = 24;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically.
createAnswerDiv(ex);

// Script from Example.
let intr = d3.interpolate( [20, 40, 4], [1, 12, 10]);

d3.select('.answer-grid')
    .append('tt')
        .text('let intr = d3.interpolate( [20, 40, 4], [1, 12, 10]);')
d3.select('.answer-grid')
    .append('p')
        .text(`Type of returned function is: ${typeof (intr)}.`)
    .append('p')
        .text(`intr(0.2) would return ${intr(0.2)} because the interpolator
                will find the 0.2th value between both values, from the first 
                value. i.e., 20 - 1 = 19, and the 0.2th value from 20 is 20 
                - 20(0.2) = 16.2.`)