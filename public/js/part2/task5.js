// .js script for exercise:
const ex = 5;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically
createAnswerDiv(ex);

// Svg constants.
let svgLength = '400px';

d3.select('.answer-grid')
    .append('svg')
        .attr('width', svgLength)
        .attr('height', svgLength)
        .attr('class', 'svg-element')
        .style('border', '2px solid green');

// Have to manually scale due to grid spacing.
// Define the horizontal scale.
const horScale = d3.scaleLinear()
                    .domain([28, 549])
                    .range([0, svgLength]);
// Define the vertical scale.
const verScale = d3.scaleLinear()
                    .domain([593, 70])
                    .range([svgLength, 0]);

// Add 'empty' text.                    
d3.select('.svg-element')
    .append('text')
        .attr('class', 'moving-text')
        .attr('x', 100)
        .attr('y', 100)
        .attr('opacity', 0)
        .style('font-size', '15px');

// 'Unempty' the text.
d3.selectAll('.svg-element')
    .on('mousemove', function(e) {
        const data = d3.pointer(e)
        let x = horScale(data[0]), y = verScale(data[1]);
        d3.select('.moving-text')
            .attr('x', x)
            .attr('y', y)
            .attr('opacity', 1)
            .text(`x: ${x.substr(0, x.indexOf('.'))},
                   y: ${y.substr(0, y.indexOf('.'))}`)
    })
    .on('mouseleave', function() {
        d3.select('.moving-text')
            .attr('opacity', 0)
            .text('')
    });