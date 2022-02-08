// .js script for exercise:
const ex = 2;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating <div>s systematically
createAnswerDiv(ex);

let data = ['rgb(204, 051, 051)', 'rgb(204, 204, 051)', 'rgb(051, 204, 051)', 'rgb(051, 051, 204)']

d3.select('.answer-grid')
    .append('div')
        .attr('class', 'inner-grid')

d3.select('.inner-grid')
    .selectAll('div')
    .data(data)
    .join('div')
        .attr('class', 'outer-show')
        .style('background-color', d => d)
        .style('font-size', '10px')
        .append('p')
            .attr('class', 'hidden')
            .text(d => d)

d3.select('.answer-grid')
    .append('p')
        .text('Hover on squares for colour.')