// js script for part 1 Exercise:
const ex = 1;

// Create Div Systematically using a genral function.
import {createDiv, createButton} from './functions.js';
createDiv(ex);

// Create empty <p> to print version.
d3.select('.answerCenter')
    .append('p')
        .attr('id', 'task' + ex)
        .attr('position', 'absolute')
        .style('text-align', 'center');

// Button for task action.
createButton(ex);

// Button action: shows d3 version in <p> field.
d3.select('.buttonori').on('click', function(){
    d3.select('#task' + ex).text('d3 version: ' + d3.version);
});