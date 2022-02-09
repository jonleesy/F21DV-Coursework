// .js script for exercise:
const ex = 3;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically
createAnswerDiv(ex);

// Using a different CSS property for a smaller grid size
d3.select('.grid-container')
    .append('div')
    .attr('class', 'answer-grid-small')
    .style('width', 'auto')
    .style('height', '100px')
    .style('background-color', 'green')
    .style('border-style', 'solid');

d3.select('.answer-grid-small')
    .on('mouseover', function(e) {
        d3.select(this)
            .style('background-color', 'orange')
            .style('border-style', 'dotted')
            .text('Pointer is in the box.');
    })
    .on('mouseout', function() {
        d3.select(this)
            .style('background-color', 'green')
            .style('border-style', 'solid')
            .text('');
    })