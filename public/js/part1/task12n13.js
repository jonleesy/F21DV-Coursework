// js script for part 1 Exercise:
const ex = '12 \& 13';

// Create Divs and button systematically using a genral function.
import {createDiv, createButton} from '../functions.js';
createDiv(ex);

// Read Csv, as part of exercise 12.
const data12 = d3.csv('../../data/part1/task12.csv');

// Adding an SVG element.
d3.select('.answerCenter')
    .append('svg') 
        .attr('width',  200) 
        .attr('height', 200) 
        .style('border', '1px solid green')
        .append('circle')
            .attr('cx', 100)
            .attr('cy', 50)
            .attr('r', 50);

// Create action button.
createButton(13)

// Button action: add new svg elements and update-remove existing ones. 
d3.select('.buttonori').on('click', function(){
    data12.then(function(data) {
        data.forEach(function(d) {
            let name = d.name;
            let data = new Array();
            let text = d.text;
            
            // Filtering for non-empty attrs.
            for (const col in d) {
                if (d[col] !== '' && col !== 'text') {
                    data.push({key: col, val: d[col]});
                }
            }

            // Add dummy attr for shorter shapes.
            while (data.length < 6) {
                data.push({key: 'dummy', val: ''})
            }

            // Enter-Update-Exit demo-ed for question 13.
            d3.select('svg')
                .selectAll(name)
                .data(data)
                .join(
                    enter => enter.append(data[0].val)
                                .attr(data[1].key, data[1].val)
                                .attr(data[2].key, data[2].val)
                                .attr(data[3].key, data[3].val)
                                .attr(data[4].key, data[4].val)
                                .attr(data[5].key, data[5].val)
                                .text(text),
                    exit => exit.transition()
                                .duration(2000)
                                .attr('r', 0)
                                .remove()
                )
        });
    })
});