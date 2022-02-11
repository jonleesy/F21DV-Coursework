// .js script for exercise:
const ex = 26;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically.
createAnswerDiv(ex);

// Script from Example.
let cc = d3.interpolateDate(new Date('2021-01-10'), new Date('2021-01-20'));

d3.select('.answer-grid')
    .append('tt')
        .text(`let cc = d3.interpolateDate(new Date('2021-01-10'), new Date('2021-01-20'));`)
d3.select('.answer-grid')
    .append('p')
        .text(`cc(0.5) would return ${cc(0.5).toISOString().slice(0, 10)}
                because the interpolator, d3.interpolateDate(),
                will find the 0.5th value between both values. The in between date for 
                '2021-01-10' and'2021-01-20' is ${cc(0.5).toISOString().slice(0, 10)}.`)