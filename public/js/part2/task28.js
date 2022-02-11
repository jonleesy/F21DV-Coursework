// .js script for exercise:
const ex = 28;

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
const numNodes = 100;
const nodes = d3.range(numNodes)
                .map(function(d) {
                    return {radius: Math.random() * 25}
                })
 
const simulation = d3.forceSimulation(nodes)
                    .force('charge', d3.forceManyBody().strength(5))
                    .force('center', d3.forceCenter(width / 2, height / 2))
                    .force('collision', d3.forceCollide().radius(function(d) {
                                                                    return d.radius
                                                                }))
                    .on('tick', ticked);

// Colour Scheme.
const colour = d3.scaleOrdinal().range(d3.schemePaired);

function ticked() {
    const u = d3.select('svg')
                .selectAll('circle')
                .data(nodes)
                .join('circle')
                    .attr('fill', (_, i) => `${colour(i)}`)
                    .attr('r', d => d.radius)
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y)
}