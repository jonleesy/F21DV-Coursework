// js script for part 1

const contentDisposition = require("content-disposition");

// Exercise 1
// Adding a span after div with class: "task1".
// d3 select then is stored in const task1.
let task1 = d3.select('.task1').append('span');
// Then setting the text to show version of d3
task1.text(d3.version);

// Exercise 2
// Out of the 3 divs, first and last was classed as "task2".
// Selecting those that were named "task2" and changing the 
// font colour to blue
d3.selectAll('.task2').style('color', 'blue');

// Exercise 3
// Loop for 10 divs, where each has "task3" classed div as
// parent div.
for (let i=1; i < 11; i++) {
    d3.select('.task3') // Select "task3".
        .append('div') // Add a div each iteration.
        .attr('class', function() { // For each div, we assign a unique class name.
            return 'task3id' + i.toString()
        })
        .style('position', 'relative') // Set a relative positon, they stack on one another.
        .style('background-color', function() { // Conditioned background colour.
        if (i > 5) {
            return 'green'
        } else {
            return 'red'
        }
        })
        .style('text-align', 'center') // Align text for each div to center.
        .text(i.toString()); // For each iteration, i is the text for that div.
};

// Exercise 4
// d3 to select "task4button" and add an event listener that listens
// for the click event.
d3.select('#task4button').on('click', function() {
    // Conditioned d3 modificaton of the first div.
    // If the first div has its original value, modify and
    // replace value with "start" and colour purple.
    // Else, if its purple with value "start", modify and
    // replace value with original "1"
    // Modification is on: div's BG color, text colour, and
    // the div's text.
    if (d3.select('.task3id1').text() == '1') {
        d3.select('.task3id1')
            .style('background-color', 'purple')
            .style('color', 'white')
            .text('start');
    } else {
        d3.select('.task3id1')
            .style('background-color', 'red')
            .style('color', 'black')
            .text('1');        
    }
})

// Exercise 5
d3.select('.task5').append('div').text('Hello World!')
    .style('color', 'green')