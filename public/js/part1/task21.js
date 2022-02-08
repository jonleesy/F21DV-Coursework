// js script for part 1 Exercise:
const ex = 21;

// Create Divs and button systematically using a general function.
import {createDiv} from '../functions.js';
createDiv(ex);

// Data for bar chart.
const data = [50, 400, 300, 900, 250, 1000];

// Graph dimension and margin constants.
const margin = {top: 15, right: 15, bottom: 35, left: 30},
      width = 200 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

// Create the svg object.
const svg = d3.select('.answerCenter')
                .append('svg')
                    .attr('width', margin.left + width + margin.right)
                    .attr('height', margin.top + height + margin.bottom)
                .append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Define the x-axis.
const xAxis = d3.scaleBand()
            .range([0, width])
            .domain(data.map(d => d))
            .padding(0.2);
// Add the x-axis.            
svg.append('g')
    .attr('transform', `translate(4, ${height})`)
    .call(d3.axisBottom(xAxis))
    .selectAll('text')
            .attr('transform', 'translate(-10,0) rotate(-45)')
            .style('text-anchor', 'end');

// Define the y-axis.
const yAxis = d3.scaleLinear()
                .domain([0, d3.max(data)])
                .range([height, 0]);
// Add the y-axis
svg.append('g')
    .attr('transform', `translate(4, 0)`)
    .call(d3.axisLeft(yAxis));

// Add the bars.
svg.selectAll('rect')
    .data(data)
    .enter()
        .append('rect')
            .attr('id', 'task14')
            .attr('x', (_, i) => xAxis(i))
            .attr('y', d => yAxis(d))
            .attr('width', xAxis.bandwidth() - margin.right/2)
            .attr('height', d => height - yAxis(d))
            .attr('fill', 'blue')
            .attr('transform', (_, i) => `translate(${i * (xAxis.bandwidth() + 5) + 12}, 0)`);

// Add description for button (which does task 15).            
d3.select('.answerCenter')
    .append('p')
        .style('text-align', 'center')
        .append('em')
            .text('Added axes to Exercise 14 & 15 already. Hence, just using the data in the example.')    