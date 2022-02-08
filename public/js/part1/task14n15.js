// Reference: https://www.d3-graph-gallery.com/graph/barplot_basic.html

// js script for part 1 Exercise:
const ex = '14 \& 15';

// Create Divs and button systematically using a general function.
import {createDiv, createButton} from '../functions.js';
createDiv(ex);

// Data from task10.js.
import {exportData} from './task10.js';
// Removing .container from task 10, due to the way
// function was setup.
d3.select('.container').remove()
d3.select('.container').style('height', '300px')
// Get data, remove first element.
const dataCsv = await exportData();

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
            .domain(dataCsv.map(d => d.name))
            .padding(0.2);
// Add the x-axis.            
svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xAxis))
    .selectAll('text')
            .attr('transform', 'translate(-10,0) rotate(-45)')
            .style('text-anchor', 'end');

// Define the y-axis.
const yAxis = d3.scaleLinear()
                .domain([0, 200])
                .range([height, 0]);
// Add the y-axis
svg.append('g')
    .call(d3.axisLeft(yAxis));

// Add the bars.
svg.selectAll('rect')
    .data(dataCsv)
    .enter()
        .append('rect')
            .attr('id', 'task14')
            .attr('x', d => xAxis(d.name))
            .attr('y', d => yAxis(d.value))
            .attr('width', xAxis.bandwidth())
            .attr('height', d => height - yAxis(d.value))
            .attr('fill', 'blue');

// Add description for button (which does task 15).            
d3.select('.answerCenter')
    .append('p')
        .style('text-align', 'center')
        .append('em')
            .text('Button would show which class has > 140 people')

// Button for task action.
createButton(15);

// Button action: changed <div>s' text colour. 
d3.select('.buttonori').on('click', function(){
    d3.selectAll('#task14')
        .style('fill', d => d.value >= 140 ? 'red' : 'blue')
});