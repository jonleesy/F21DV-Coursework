// .js script for exercise:
const ex = 27;

// Imports of functions.
import { createAnswerDiv } from '../functions.js';

// Creating base <div>s systematically.
createAnswerDiv(ex);

// Create Dataset.
const dataset = {
    apples: [5345, 2879, 1997, 2437, 4045],
    lemons: [4365, 1965, 2001, 1800, 800]
}

// Local Constants.
const length = 400, radius = length/2;
const colour = d3.scaleOrdinal().range(d3.schemeSet3);

// Pir and Arc variables.
const pie = d3.pie().sort(null);
const arc = d3.arc()
                .innerRadius(radius/2)
                .outerRadius(radius/4);

// Svg Object.
const svg = d3.select('.answer-grid')
                .append('svg')
                .attr('width', length)
                .attr('height', length)
                .append('g')
                    .attr('transform', `translate(${length/2}, ${length/2})`)

// Text placeholder.
svg.append('text')
    .attr('class', 'text-label')
    .style('font-size', '1em')

// Using Current and New Data to control the transitions.
let currentData = dataset.apples;

// https://bl.ocks.org/rshaker/225c6df494811f46f6ea53eba63da817
// Update functions.
function update(data) {

    // Duration of transitions.
    const duration = 400;

    // Rename text.
    d3.select('.text-label')
        .transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .style('font-size', '0em')
            .attr('opacity', 0)
            .text(() => (data === dataset.apples) ? 'Apple' : 'Lemon')
        .transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .style('font-size', '1em')
            .attr('opacity', 1);
        
    // Current and previous data.
    let was = currentData;
    let is = data;

    // Add a path object.
    let path = svg.selectAll('path')
                    .data(pie(was))
    path.enter()
        .insert('path')
            .style('fill', (_, i) => colour(i))
            .each(function(d) {
                this._current = d;
            })

    path = svg.selectAll('path')
                .data(pie(is))

    path.transition()
        .duration(400)
        .attrTween('d', function(d) {
            // Interpolation between the old (this._current), and new (d)
            const interpolate = d3.interpolate(this._current, d);
            const _this = this;
            return function(t) {
                _this._current = interpolate(t);
                return arc(_this._current);
            }
        })

    path = svg.selectAll('path')
                .data(pie(data))

    path.exit()
        .transition()
        .delay(400)            
        .duration(0)
        .remove()

    currentData = data;            
}

update(dataset.apples)


// Add buttons to activate data 1,2,3
const buttonGrid = d3.select('.answer-grid')
                    .append('div')
                        .attr('class', 'inner-grid');

// Button names for div population.
const buttonData = ['Apple', 'Lemon'];
const dataColours = ['red', 'yellow'];

// Add buttons (divs).
buttonGrid.selectAll('div')
            .data(buttonData)
            .join('div')
                .attr('class', d => d)
                .style('background-color', (_, i) => dataColours[i])
                .append('p')
                    .text(d => d);

// Add mouse events.
d3.select('.Apple')
    .on('click', function() {
        update(dataset.apples);
    })
    .on('pointerover', function() {
        d3.select(this)
            .style('background-color', 'lightpink')
    })
    .on('mouseout', function() {
        d3.select(this)
        .style('background-color', 'red')
    });
d3.select('.Lemon')
    .on('click', function() {
        update(dataset.lemons);
    })
    .on('pointerover', function() {
        d3.select(this)
        .style('background-color', 'lightyellow')
    })
    .on('mouseout', function() {
        d3.select(this)
        .style('background-color', 'yellow')
    });

// Add instructions.
d3.select('.answer-grid')
    .append('p')
        .text('Click on data 1/2 to present new data.')