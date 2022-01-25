// js script for part 1 Exercise:
const ex = 17;

// Create Div Systematically using a genral function.
import {createDiv, createButton} from './functions.js';
createDiv(ex);

// Data for bar chart.
const data = [50, 400, 300, 900, 250, 1000];

// Svg constants
const width = 200, barHeight = 20, margin = 2;

// Creating the svg object.
const svg = d3.select('.answerCenter')
                .append('svg')
                    .attr('width', width)
                    .attr('height', barHeight * data.length);

// Define the x-axis.
const xScale = d3.scaleLinear()
                    .domain([d3.min(data), d3.max(data)])
                    .range([30, 200]);

// Add 'g' object.
const g = svg.selectAll('g')
            .data(data)
            .enter()
                .append('g')
                    .attr('transform', (_, i) => `translate(0, ${i * barHeight})`);
                
// Add 'rect' elements.
g.append('rect')
    .attr('width', d => xScale(d))
    .attr('height', barHeight - margin)
    .attr('fill', 'blue')
    
g.append('text')
    .attr('x', d => xScale(d))
    .attr('y', barHeight/2)
    .attr('dy', '.25em')
    .style('text-anchor', 'end')
    .text(d => d);

// Add description for button (which does task 15).            
d3.select('.answerCenter')
    .append('p')
        .style('text-align', 'center')
        .append('em')
            .text('Button would show green bars if below 100, and red if above 500')    

// Button for task action.
createButton(ex);

// Button action: changed <div>s' text colour. 
d3.select('.buttonori').on('click', function(){
    if (d3.select('rect').attr('fill') === 'blue') {
        d3.selectAll('rect')
            .attr('fill', d => (d < 100) ? 'green' : ((d > 500) ? 'red' : 'blue'))
    } else {
        d3.selectAll('rect')
            .attr('fill', 'blue')
    }
});