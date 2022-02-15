// .js script for exercise:
const ex = 8;

// Imports of functions.
import { createAnswerDivSmall } from '../functions.js';

// Creating base <div>s systematically
createAnswerDivSmall(ex);

// Add original div.
d3.select('.answer-grid-small')
    .append('div')
        .style('width', '210px')
        .style('height', '100px')
        .style('background-color', 'blue')
        .text('1');

// Add mouse over action. Div changes on mouse over
// and reverts on mouse leave.
d3.select('.answer-grid-small div')
    .on('mouseenter', function() {
        // Add transtion for mouse enter.
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
    })
    // Add transtion for mouse leave.
    .on('mouseleave', function() {
        d3.select(this)
            .transition()
                .duration(1000)
                .style('background-color', 'blue')
                .style('width', '210px')
                .text('1')
    });

// Add instruction.
d3.select('.answer-grid-small')
    .append('p')
    .text('Hover on colour box to change colour and box size.')