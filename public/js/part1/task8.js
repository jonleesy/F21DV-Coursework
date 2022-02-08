// js script for part 1 Exercise:
const ex = 8;

// Create Divs and button systematically using a genral function.
import {createDiv, createButton} from '../functions.js';
createDiv(ex);

// Data for <span> population.
const data = ['a', 4, 1, 'b', 6, 2, 8, 9, 'z'];

// Add a <div> to  center text.
d3.select('.answerCenter').append('div')
    .attr('class', 'centerdiv')
    .style('text-align', 'center');

// Create two <p>s for modification.
const selected = d3.select('.centerdiv')
                    .selectAll('span')
                    .data(data)
                    .join(
                        enter => enter.append('span')
                                .style('color', 'black')
                                .text((d) => d)
                    );

// Button for task action.
createButton(ex);

// Button action: changed <p>s' text colour. 
d3.select('.buttonori').on('click', function(){
    selected
        .style('color', function(d) {
            // Conditional check to revert <div>s to original color.
            if (d3.select(this).style('color') === 'black') {
                return (typeof d === 'string') ? 'blue' : 'green';
            } else {
                return 'black'
            }
        })
});