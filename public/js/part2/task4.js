// .js script for exercise:
const ex = 4

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically
createAnswerDiv(ex);

// Svg constants.
let svgLength = 400.

const svg = d3.select('.answer-grid')
                .append('svg')
                    .attr('width', svgLength)
                    .attr('height', svgLength)
                    .style('border', '2px solid green');

svg.append('circle')
    .attr('cx', svgLength/2)
    .attr('cy', svgLength/2)
    .attr('r', svgLength/4)
    .attr('stroke', 'black')
    .style('fill', 'orange');

svg.selectAll('circle')
    .on('mouseover', function() {
        d3.select(this)
            .attr('r', svgLength/4)
            .transition()
            .duration(500)
            .attr('r', svgLength/3);
    })
    .on('mouseout', function(){
        d3.select(this)
            .transition()
            .duration(500)
            .attr('r', svgLength/4);
    });