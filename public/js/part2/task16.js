// .js script for exercise:
const ex = 16;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically.
createAnswerDiv(ex);

// Reading in data for task 15.
const data15 = d3.csv('../../data/part2/task15.csv');

// Svg Constants.
let svgLength = 420;

// Adding the svg object.
const svg = d3.select('.answer-grid')
                .append('svg')
                .attr('width', svgLength)
                .attr('height', svgLength)

// More Constants.
let margin = 40,
    length = svg.attr('width') - margin;

// Add Title
svg.append('text')
    .attr('transform', 'translate(100,0)')
    .attr('x', 50)
    .attr('y', 10)
    .attr('font-size', '15px')
    .text('Stock Price');

// Defining the Axes.
const horScale = d3.scaleBand()
                    .range([0, length])
                    .padding(0.4);
const verScale = d3.scaleLinear()
                    .range([length, 0]);

// Append a 'g' element.
const g = svg.append('g')
                .attr('transform', 'translate(25,25) scale(0.95)')

// Processing the Csv.
data15.then(function(data) {
    // Local Variables
    let scaleMargin = 10;
    
    // Defining the hor/ver axis domain.
    horScale.domain(data.map(d => d.year));
    verScale.domain([0, d3.max(data, d => d.value)]); 

    // Adding the x-axis.
    g.append('g')
        .attr('transform', `translate(0,${length})`)
        .call(d3.axisBottom(horScale))
        .append('text')
        .attr('y', length - 150)
        .attr('x', length - 100)
        .attr('text-anchor', 'end')
        .attr('stroke', 'black')
        .text('Year');

    // Add the y-axis.
    g.append('g')
        .call(d3.axisLeft(verScale).tickFormat(d => `$${d}`)
            .ticks(10))
        .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '-5.1em')
            .attr('text-anchor', 'end') 
            .attr('stroke', 'black')
            .text('Stock Price');

    // Add the Bars.
    g.selectAll('.bar')
        .data(data)
        .join('rect')
            .attr('class', 'bar')
            .on('mouseover', onMouseOver)
            .on('mouseout', onMouseOut)
            .attr('x', d => horScale(d.year))
            .attr('y', d => verScale(d.value))
            .attr('width', horScale.bandwidth())
            .transition()
                .duration(400)
                .ease(d3.easeLinear)
                .delay((_, i) => i * 50)
                .attr('height', d => length - verScale(d.value))

    function onMouseOver(e, d) {
        d3.select(this)
            .attr('class', 'highlight')
            .transition()
                .duration(400)
                .attr('width', horScale.bandwidth() + scaleMargin/2)
                .attr('y', verScale(d.value) - scaleMargin)
                .attr('height', length - verScale(d.value) + scaleMargin)
                .attr('transform', `translate(${-scaleMargin/4},0)`);
        
        g.append('text')
            .attr('class', 'val')
            .attr('x', horScale(d.year) + scaleMargin)
            .attr('y', verScale(d.value) - scaleMargin * 3/2)
            .attr('font-size', '10px')
            .text(`$${d.value}`);
    }

    function onMouseOut(e, d) {
        d3.select(this)
            .attr('class', 'bar')
        d3.select(this)
            .transition()
                .duration(400)
                .attr('width', horScale.bandwidth())
                .attr('x', horScale(d.year))
                .attr('y', verScale(d.value))
                .attr('height', length - verScale(d.value))
                .attr('transform', `translate(0,0)`);

        d3.selectAll('.val')
            .remove()
    }
});
