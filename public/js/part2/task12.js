// .js script for exercise:
const ex = 12;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically
createAnswerDiv(ex);

// Svg Constants
const svgLength = 300;
const margin = 10;
const transitionDuration = 2000;

// Data for rectangle position.
const data = [10, 110, 210];

// Add the svg.
const svg = d3.select('.answer-grid')
                .append('svg')
                .attr('width', svgLength)
                .attr('height', svgLength)
                .style('border', '2px solid black');

// Add the bars., without adding any height.                
const bars = svg.selectAll('rect')
                .data(data)
                .join('rect')
                    .attr('fill', 'blue')
                    .attr('x', d => d)
                    .attr('y', margin)
                    .attr('height', 0)
                    .attr('width', svgLength/3 - margin * 2);

// Calling the update function.
update();

// 'Update' function.
function update() {
    // Forward Transition
    bars.transition()
        .ease(d3.easeExp)
        .duration(transitionDuration)
        .delay((_, i) => i * (transitionDuration - 100))
        .attr('height', (_, i) => (svgLength/3)*(i + 1) - margin*2)
}