// .js script for exercise:
const ex = 23;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically.
createAnswerDiv(ex);

// Creating the data
const data1 = await d3.csv('../../data/part1/task23.csv');
const data2 = await d3.csv('../../data/part2/task23.csv');

const dataColours = ['red', 'green', 'blue'];

// Svg and Graph Constants
const margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 400 - margin.left - margin.right,
        height = 400 - margin.bottom - margin.top;

// Create the svg object.
const svg = d3.select('.answer-grid')
                .append('div')
                    .append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .append('g')
                            .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Define the Axes
let horScale = d3.scaleLinear()
                    .range([0, width])
                    .domain(d3.extent(data1, d => d.x));
let verScale = d3.scaleLinear()
                    .domain(d3.extent(data1, d => d.y))
                    .range([height, 0]);

// Adding the Axes
svg.append('g')
    .attr('class', 'bottom-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(horScale))
svg.append('g')
    .attr('class', 'top-axis')
    .call(d3.axisTop(horScale))
svg.append('g')
    .attr('class', 'left-axis')
    .call(d3.axisLeft(verScale));
svg.append('g')
    .attr('transform', `translate(${width}, 0)`)
    .attr('class', 'right-axis')
    .call(d3.axisRight(verScale));

// Define a line.
const line = d3.line()
                .x(d => horScale(d.x))
                .y(d => verScale(d.y))

// Add the initial path.
svg.append('path')
    .attr('class', 'line')
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('d', line(data1))

// Bar Chart Function. Clears and add.
function update(data) {

    // Re-Define the Axes
    horScale = d3.scaleLinear()
                .range([0, width])
                .domain(d3.extent(data, d => d.x));
    verScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.y))
                .range([height, 0]);

    // Re-Call the Axes.
    d3.selectAll('.bottom-axis')
        .transition()
            .duration(400)
            .ease(d3.easeLinear)
            .call(d3.axisBottom(horScale))
    d3.selectAll('.top-axis')
        .transition()
            .duration(400)
            .ease(d3.easeLinear)
            .call(d3.axisTop(horScale))
    d3.selectAll('.left-axis')
        .transition()
            .duration(400)
            .ease(d3.easeLinear)
            .call(d3.axisLeft(verScale))
    d3.selectAll('.right-axis')
        .transition()
            .duration(400)
            .ease(d3.easeLinear)
            .call(d3.axisRight(verScale))

    // Update the svg line data.
    svg.selectAll('.line').transition()
            .duration(400)
            .ease(d3.easeLinear)
            .attr('d', line(data))
}

// Opening a data upon launch.
update(data1);

// Add buttons to activate data 1,2,3
const buttonGrid = d3.select('.answer-grid')
                    .append('div')
                        .attr('class', 'inner-grid');

// Button names for div population.
const buttonData = ['data1', 'data2'];

// Add buttons (divs).
buttonGrid.selectAll('div')
            .data(buttonData)
            .join('div')
                .attr('class', d => d)
                .style('background-color', (_, i) => dataColours[i])
                .append('p')
                    .text(d => d);

// Add mouse events.
d3.select('.data1')
    .on('click', function() {
        update(data1);
    })
    .on('pointerover', function() {
        d3.select(this)
            .style('background-color', 'lightpink')
    })
    .on('mouseout', function() {
        d3.select(this)
        .style('background-color', 'red')
    });
d3.select('.data2')
    .on('click', function() {
        update(data2);
    })
    .on('pointerover', function() {
        d3.select(this)
        .style('background-color', 'lightgreen')
    })
    .on('mouseout', function() {
        d3.select(this)
        .style('background-color', 'green')
    });

// Add instructions.
d3.select('.answer-grid')
    .append('p')
        .text('Click on data 1/2 to present new data.')