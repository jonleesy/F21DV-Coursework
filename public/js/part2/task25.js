// .js script for exercise:
const ex = 25;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically.
createAnswerDiv(ex);

// Script from Example.
let cc = d3.interpolate('red', 'green');

d3.select('.answer-grid')
    .append('tt')
        .text(`let cc = d3.interpolate('red', 'green');`)
    
d3.select('.answer-grid')
    .append('p')
        .text(`cc(0.5) would return ${cc(0.5)} because the interpolator
                will find the 0.5th value between both values. Red has 
                value rgb(255, 0, 0), and green has value rgb(0, 128, 0).
                 Hence, the 0.5th value in between both the rgb numbers 
                 are ${cc(0.5)}.`)