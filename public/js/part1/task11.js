// js script for part 1 Exercise:
const ex = 11;

// Create Divs and button systematically using a genral function.
import {createDiv, createButton} from './functions.js';
createDiv(ex);

// Data for <div> population.
// Data Points for square lines.
let data11 = [{x:[10,190],   y:[10,10],     'color':'red'},
              {x:[190,190], y:[10,190],   'color':'blue'},
              {x:[190,10],   y:[190,190], 'color':'purple'},
              {x:[10,10],     y:[190,10],   'color':'green'}];

// Generalised d3 svg div selection.
let svg11 = d3.select('.answerCenter');

// Create SVG element.
svg11.append('svg')
    .attr('width', 200)
    .attr('height', 200)
    .style('border', '6px solid yellow')

// Button for task action.
createButton(ex);

// Button action: changed <div>s' text colour. 
d3.select('.buttonori').on('click', function(){
    // Create line element inside SVG, using data points from data11.
    for (let key in data11) {
        svg11.select('svg').append('line')
            .attr('x1', data11[key]['x'][0])
            .attr('x2', data11[key]['x'][1])
            .attr('y1', data11[key]['y'][0])
            .attr('y2', data11[key]['y'][1])
            .attr('stroke-width', 6)
            .attr('stroke', data11[key]['color'])
    }
});