// js script for part 1 Exercise:
const ex = 7;

// Create Div Systematically using a genral function.
import {createDiv, createButton} from './functions.js';
createDiv(ex);

// Data for <div> population.
let data = [10, 50, 100, 200];

// Create two <p>s for modification.
d3.select('.answerCenter')
    .selectAll('div')
    .data(data)
    .join(
        enter => enter.append('div')
                    .attr('id', 'task7')
                    .style('color', 'black')
    )
    .text((d, i) => i+1 + '. cont:' + d);

// Button for task action.
createButton(ex);

// Button action: changed <div>s' text colour. 
d3.select('.buttonori').on('click', function(){
    d3.selectAll('#task7')
        .style('color', function(d) {
            // Conditional check to revert <div>s to original color.
            if (d3.select(this).style('color') === 'black') {
                return (d >= 50 && d <= 100) ? 'red' : 'blue';
            } else {
                return 'black'
            }
        })
});