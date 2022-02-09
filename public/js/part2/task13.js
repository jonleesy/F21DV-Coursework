// .js script for exercise:
const ex = 13;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically
createAnswerDiv(ex);

// Svg Constants
const svgLength = 300, margin = 10;

const data = [10, 110, 210];

const svg = d3.select('.answer-grid')
                .append('svg')
                .attr('width', svgLength)
                .attr('height', svgLength)
                .style('border', '2px solid black');

const bars = svg.selectAll('rect')
                .data(data)
                .join('rect')
                    .attr('fill', 'blue')
                    .attr('x', d => d)
                    .attr('y', margin)
                    .attr('height', 0)
                    .attr('width', svgLength/3 - margin * 2);

update();
// update2();

function update() {
    // Forward Transition
    bars.transition()
            .ease(d3.easeExp)
            .duration(2000)
            .delay((_, i) => i * 2000)
            .attr('height', (_, i) => (svgLength/3)*(i + 1) - margin*2)
        .transition()
            .ease(d3.easeExp)
            .duration(2000)
            .delay(4000)
            .attr('height', 0);
}