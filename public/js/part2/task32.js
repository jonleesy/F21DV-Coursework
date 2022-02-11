// .js script for exercise:
const ex = 32;

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
 
const simulation = d3.forceSimulation(nodes)
                    // .force('charge', d3.forceManyBody().strength(5))
                    .force('charge', d3.forceManyBody().strength(-10))
                    .force('center', d3.forceCenter(width / 2, height / 2))
                    .force('y', d3.forceY().y(() => 0))
                    // .force('link', d3.forceLink().links(links))
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
        // Change oppacity and COLOUR on hover
        d3.select(this)
            .attr('fill', colour(d.index + 0.1));

        console.log(d3.select(this).attr('fill'), colour(d.index))

        // Put Label.
        svg.append('g')
            .append('text')
            .attr('x', d.x)
            .attr('y', d.y)
            .text(`r: ${d.radius}`);
    }

    // Define mouse exit function.
    function onMouseExit(_, d) {
        // Revert d3 element attr (COLOUR).
        d3.select(this)
            .attr('fill', colour(d.index));

        // Select text and remove.
        d3.selectAll(`text`)
            .remove();
    }
}