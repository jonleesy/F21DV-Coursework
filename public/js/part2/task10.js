// .js script for exercise:
const ex = 10;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically
createAnswerDiv(ex);

// Svg constants.
const svgLength = 400;
const transtionDuration = 500;

// Add the svg.
const svg = d3.select('.answer-grid')
                .append('svg')
                    .attr('width', svgLength)
                    .attr('height', svgLength)
                    .style('border', '2px solid green');

// Add a circle for transition.
svg.append('circle')
    .attr('cx', svgLength/2)
    .attr('cy', svgLength/2)
    .attr('r', svgLength/4)
    .attr('stroke', 'black')
    .style('fill', 'orange');

// Add hover action.
svg.selectAll('circle')
    .on('mouseover', function() {
        d3.select(this)
            .attr('r', svgLength/4)
            // Add transition
            .transition()
            .ease(d3.easeBounce)
            .duration(transtionDuration)
            .attr('r', svgLength/3);
    })
    .on('mouseout', function(){
        d3.select(this)
            // Add transition
            .transition()
            .ease(d3.easeBounce)
            .duration(transtionDuration)
            .attr('r', svgLength/4);
    });