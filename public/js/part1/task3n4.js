// js script for part 1 Exercise:
const ex = '3 \& 4';

// Create Divs and button systematically using a genral function.
import {createDiv, createButton} from './functions.js';
createDiv(ex);

// Array of numbers [0, 1, 2, ..., 10], defining number of exercises.
const data = Array.from({length: 10}, (_, i) => i + 1);

// Create 10 <div>s for modification.
d3.select('.answerCenter')
    .selectAll('#task3')
    .data(data)
    .join(
        enter => enter.append('div')
                .attr('id', 'task3')
                .style('text-align', 'center')
                .text(d => d)
                .style('background-color', (_, i) => i > 4 ? 'green' : 'red')
    );

// Restyle container to include more than 200 px
d3.select('.container')
    .style('height', '250px');

// Button for task action.
createButton(ex);

// Button action: changes <div>s' text colour, 
// and rename first <div> to 'start'. If <div>s 
// have been renamed, buton would revert it to 
// its original state
d3.select('.buttonori').on('click', function(){
    if (d3.select('#task3').text() == '1') {
        d3.selectAll('#task3')
            .data(data)
            .text((d, i) => i == 0 ? 'Start' : d-1)
            .style('background-color', function(d, i) {
                if (i == 0) {
                    return 'purple';
                } else if (i < 6) {
                    return 'green';
                } else {
                    return 'red';
                }
            });
    } else {
        d3.selectAll('#task3')
            .data(data)
            .text(d => d)
            .style('background-color', function(d, i) {
                return (i > 4 ? 'green' : 'red')
            });
    }
});