// .js script for exercise:
const ex = 30;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically.
createAnswerDiv(ex);

const width = 400, height = 400;

// setup svg
d3.select('.answer-grid')
        .append('svg')
        .attr('width',width)
        .attr('height',height);

// generate some random data
const nodes = await d3.csv('../../data/part2/task30.csv')
 
d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(5))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(function(d) {
                                                    return d.radius
                                                }))
    .on('tick', ticked);

// Colour Scheme.
const colour = d3.scaleOrdinal().range(d3.schemePaired);

function ticked() {
    const svg = d3.select('svg');
    
    svg.selectAll('circle')
        .data(nodes)
        .join('circle')
            .attr('fill', (_, i) => `${colour(i)}`)
            .attr('r', d => d.radius)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .on('mouseover', onMOuseOver)
            .on('mouseleave', onMouseExit)

    // Define mouse over function.
    function onMOuseOver(_, d) {
        // Change oppacity on hover
        d3.select(this)
            .attr('opacity', 0.9);

        // Put Label.
        svg.append('g')
            .attr('class', 'temp')
            .append('text')
                .attr('x', d.x)
                .attr('y', d.y)
                .text(`r: ${d.radius}`);
    }

    // Define mouse exit function.
    function onMouseExit() {
        // Revert d3 element attr.
        d3.select(this)
            .attr('opacity', 1.0);

        // Select text and remove.
        d3.selectAll(`.temp`)
            .remove();
    }
}