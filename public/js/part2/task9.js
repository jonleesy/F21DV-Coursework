// .js script for exercise:
const ex = 9;

// Imports of functions.
import { createAnswerDivSmall } from '../functions.js';

// Creating base <div>s systematically.
createAnswerDivSmall(ex);

/**
 * Function appends div to the answer grid.
 * Then creates a looping transition.
 * @param {*} easeMethod 
 * @param {*} easeMethodStr 
 */
function divTransition(easeMethod, easeMethodStr) {
    const divSelect = d3.select('.answer-grid-small')
                    .append('div')
                        .text(easeMethodStr);
    
    // Initialise the transtion.                        
    repeatTransition();

    // Transition Function.
    function repeatTransition() {
        divSelect.style('width', '210px')
                    .style('height', '100px')
                    .style('background-color', 'lightblue')
                    .transition()
                        .ease(easeMethod)
                        .duration(1500)
                        .style('width', '170px')
                        .style('background-color', 'lightpink')
                    .transition()
                        .ease(easeMethod)
                        .duration(1500)
                        .style('width', '210px')
                        .style('background-color', 'lightblue')
                        // Calling itself again upon end
                        .on('end', repeatTransition);
    }
}

// Add two differnt div's with different ease method.
divTransition(d3.easeExp, 'easeLinear');
divTransition(d3.easeBounce, 'easeBounce');