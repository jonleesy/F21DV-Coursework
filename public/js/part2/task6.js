// .js script for exercise:
const ex = 6;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically
createAnswerDiv(ex);

// Add original div.
d3.select('.answer-grid')
    .append('div')
        .style('width', 'auto')
        .style('height', '100px')
        .style('background-color', 'blue')
        .text('1');

// Add Transition.
d3.select('.answer-grid div')
    .on('click', function() {
        d3.select(this)
            // Ori -> 2(red)
            .transition()
                .duration(1000)
                .style('background-color', 'red')
                .text('2')
            // 2(red) -> 3(green)    
            .transition()
                .duration(1000)
                .style('background-color', 'green')
                .text('3')
            // 3(green) -> Ori
            .transition()
                .duration(1000)
                .style('background-color', 'blue')
                .text('1')
    });

// Add Instructions.
d3.select('.answer-grid')
    .append('p')
    .text('Click on colour box to change colour.')