// js script for part 1 Exercise:
const ex = 16;

// Create Div Systematically using a genral function.
import {createDiv, createButton} from './functions.js';
createDiv(ex);

// Resizing container to fit more objects.
d3.select('.container').style('height', '400px')

const width = 200; const height = 500;
const data = [10, 15, 20, 25, 30];

// Note different valid ways of specifying color
const colors = ['rgb(133,220,148)','rgb(133,200,148)','rgb(133,180,148)','rgb(133,160,148)','rgb(133,140,148)'];

// Define the svg.
const svg = d3.select('.answerCenter')
                .append('svg')
                .attr('width', width)
                .attr('height', height);
                
const g = svg.selectAll('g #left')
                .data(data)
                .enter()
                    .append('g')
                    // .attr('transform', (d, i) => 'translate(0,0)')
                    .attr('id', 'left');

g.append('circle')
    .attr('cx', 50)
    .attr('cy', (_, i) => i * 60 + 50)
    .attr('r', d => d)
    .attr('fill', (_, i) => colors[i]);

g.append('text')
    .attr('x', 43)
    .attr('y', (_, i) => i * 60 + 53)
    .attr('stroke', 'black')
    .attr('font-size', '12px')
    .attr('font-family', 'sans-serif')
    .text(d => d);

// Button for task action.
createButton(ex);

// Button action: changed <div>s' text colour. 
d3.select('.buttonori').on('click', function(){
    // New colours for squares.
    const colors2 = ['rgb(214,180,133)','rgb(214,170,133)','rgb(214,160,133)','rgb(214,150,133)','rgb(214,140,133)'];
    
    // New svgs with id: '#right'
    const g = svg.selectAll('g #right')
                    .data(data)
                    .enter()
                        .append('g')
                        .attr('id', 'right');

    // Add the rectangle (suqare).
    g.append('rect')
        .attr('x', (_, i) => 140 - 5 * i)
        .attr('y', (_, i) => i * 60 + 40 - 5 * i)
        .attr('width', d => d * 2)
        .attr('height', d => d * 2)
        .attr('fill', (_, i) => colors2[i])

    // Add text of width size.
    g.append('text')
        .attr('x', 143)
        .attr('y', (_, i) => i * 60 + 53)
        .attr('stroke', 'black')
        .attr('font-size', '12px')
        .attr('font-family', 'sans-serif')
        .text(d => d);
});