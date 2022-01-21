// js script for part 1 Ex: 1

// Create Div Systematically using a genral function
import {createDiv, createButton} from './part1_functions.js';
createDiv(1);

d3.select('.answerCenter')
    .append('p')
        .attr('id', 'task1')
        .attr('position', 'absolute')
        .style('text-align', 'center');

createButton(1);

d3.select('.buttonori').on('click', function(){
    d3.select('#task1').text('d3 version: ' + d3.version);
})