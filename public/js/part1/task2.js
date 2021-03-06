// js script for part 1 Exercise:
const ex = 2;

// Create Divs and button systematically using a genral function.
import {createDiv, createButton} from '../functions.js';
createDiv(ex);

// Data for <p>s population.
const data = ['First', 'Second'];

// Create two <p>s for modification.
d3.select('.answerCenter')
    .selectAll('#task2')
    .data(data)
    .join(
        enter => enter.append('p')
                .attr('id', 'task2')
                .style('text-align', 'center')
                .text((d, _) => d + ' paragraph')
    );

// Button for task action.
createButton(ex);

// Button action: changed <p>s' text colour. 
d3.select('.buttonori').on('click', function(){
    d3.selectAll('#task2').style('color', 'red')
});