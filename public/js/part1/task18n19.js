// js script for part 1 Exercise:
const ex = '18 \& 19';

// Create Div Systematically using a genral function.
import {createDiv, createButton} from './functions.js';
createDiv(ex);

// Data for bar chart.
const data1 = await d3.csv('../../data/part1/task18.csv');
const data2 = await d3.csv('../../data/part1/task19.csv');

// Svg constants
const width = 200, barHeight = 20, margin = 2;

// Task 18 function.
async function task18(data, csvid) {

    // Creating the svg object.
    const svg = d3.select('.answerCenter')
                    .append('svg')
                        .attr('width', width)
                        .attr('height', barHeight * data.length)
                        .attr('id', `task${csvid}`);

    // Define the x-axis.
    const xScale = d3.scaleLinear()
                        .domain([0, 1000])
                        .range([30, 200]);

    // Add 'g' object.
    const g = svg.selectAll('g')
                .data(data)
                .enter()
                    .append('g')
                        .attr('transform', (_, i) => `translate(0, ${i * barHeight})`);
                    
    // Add 'rect' elements.
    g.append('rect')
        .attr('width', d => xScale(d.values))
        .attr('height', barHeight - margin)
        .attr('fill', d => (d.values < 100) ? 'green' : ((d.values > 500) ? 'red' : 'blue'))
    
    // Add 'text' objects.
    g.append('text')
        .attr('x', d => xScale(d.values))
        .attr('y', barHeight/2)
        .attr('dy', '.25em')
        .style('text-anchor', 'end')
        .text(d => d.values);
}

// Calling the same function for 18, and 19.
task18(data1, 1)
task18(data2, 2)