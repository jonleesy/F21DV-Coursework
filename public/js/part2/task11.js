// .js script for exercise:
const ex = 11;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically
createAnswerDiv(ex);

// Svg constants.
let svgLength = 400;

const svg = d3.select('.answer-grid')
                .append('svg')
                    .attr('width', svgLength)
                    .attr('height', svgLength)
                    .style('border', '2px solid green');

svg.append('text')
    .attr('x', svgLength/3)
    .attr('y', svgLength/3)
    .style('fill', 'orange')
    .text('Hover Over Me');

svg.selectAll('text')
    .on('mouseover', function() {
        d3.select(this)
            .attr('transform', 'scale(1.0)')
            .transition()
            .ease(d3.easeExp)
            .duration(500)
            .attr('transform', 'scale(1.3)')
            .style('fill', 'red');
    })
    .on('mouseout', function(){
        d3.select(this)
            .transition()
            .ease(d3.easeExp)
            .duration(500)
            .attr('transform', 'scale(1.0)')
            .style('fill', 'orange');
    });