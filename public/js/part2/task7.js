// .js script for exercise:
const ex = 7;

// Imports of functions.
import { createAnswerDivSmall } from '../functions.js';

// Creating base <div>s systematically
createAnswerDivSmall(ex);

d3.select('.answer-grid-small')
    .append('div')
        .style('width', '200px')
        .style('height', '100px')
        .style('background-color', 'blue')
        .text('1');

d3.select('.answer-grid-small div')
    .on('click', function() {
        d3.select(this)
            .transition()
                .duration(1000)
                .style('background-color', 'red')
                .style('width', '110px')
                .text('2')
            .transition()
                .duration(1000)
                .style('background-color', 'green')
                .style('width', '120px')
                .text('3')
            .transition()
                .duration(1000)
                .style('background-color', 'blue')
                .style('width', '200px')
                .text('1')
    });

d3.select('.answer-grid-small')
    .append('p')
    .text('Click on colour box to change colour and box size.')