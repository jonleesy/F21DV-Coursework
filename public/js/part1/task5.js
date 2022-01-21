// js script for part 1 Exercise:
const ex = 5;

// Create Div Systematically using a genral function.
import {createDiv} from './functions.js';
createDiv(ex);

// Create <div> for chaining modification.
d3.select('.answerCenter')
    .append('div')
        .style('text-align', 'center')
        .style('color', 'green')
        .text('Hello World!');
