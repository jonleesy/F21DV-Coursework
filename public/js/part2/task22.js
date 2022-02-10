// .js script for exercise:
const ex = 21;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically.
createAnswerDiv(ex);

// Creating the data
const data1 = [
    {group:'A', value:5, color:'red'},
    {group:'B', value:20, color:'red'},
    {group:'C', value:9, color:'red'}
];

const data2 = [
    {group:'A', value:10, color:'green'},
    {group:'B', value:2, color:'green'},
    {group:'C', value:22, color:'green'},
    {group:'D', value:16, color:'green'}
];

const data3 = [
    {group:'A', value:6, color:'blue'},
    {group:'B', value:18, color:'blue'},
    {group:'C', value:11, color:'blue'}
];

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

// Transition Constants.
// const t = d3.transiton()
//             .duration(400)
//             .ease(d3.easeLinear);

// Define the Axes
let horScale = d3.scaleBand()
                    .range([0, width])
                    .domain(data1.map(d => d.group))
                    .padding(0.2);
let verScale = d3.scaleLinear()
                    .domain([0, 22])
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
    .attr('class', 'myYAxis')
    .call(d3.axisLeft(verScale));
svg.append('g')
    .attr('transform', `translate(${width}, 0)`)
    .attr('class', 'myYAxis')
    .call(d3.axisRight(verScale));

// Bar Chart Function. Clears and add.
function update(data) {

    // Re-Define the Axes
    horScale = d3.scaleBand()
                .range([0, width])
                .domain(data.map(d => d.group))
                .padding(0.2);

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

    // Using a variable to implement a .merge() function.
    const u = svg.selectAll('rect')
                .data(data)

    u.enter()
        .append('rect')
            .on('mouseover', function(e, d) {                        
                    svg.append('text')
                    .attr('x', horScale(d.group) + margin.left/(data.length))
                    .attr('y', verScale(d.value)/2 + height/2)
                    .attr('class', 'temp-text')
                    .attr("dy", ".35em")
                    .text(d.value);
            })
            .on('mouseout', function(_, i) {
                d3.select('.temp-text')
                    .remove()
            })
        .merge(u)
        .transition()
            .duration(1000)
                .attr('x', d => horScale(d.group))
                .attr('y', d => verScale(d.value))
                .attr('width', horScale.bandwidth())
                .attr('height', d => height - verScale(d.value))
                .attr('fill', d => d.color);

    // Remove the extra bar.
    u.exit().remove();
}

// Opening a data upon launch.
update(data1);

// Add buttons to activate data 1,2,3
const buttonGrid = d3.select('.answer-grid')
                    .append('div')
                        .attr('class', 'inner-grid');

// Button names for div population.
const buttonData = ['data1', 'data2', 'data3'];

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
d3.select('.data3')
    .on('click', function() {
        update(data3);
    })
    .on('pointerover', function() {
        d3.select(this)
        .style('background-color', 'lightblue')
    })
    .on('mouseleave', function() {
        d3.select(this)
        .style('background-color', 'blue')
    });

// Add instructions.
d3.select('.answer-grid')
    .append('p')
        .text('Click on data 1/2/3 to present new data.')