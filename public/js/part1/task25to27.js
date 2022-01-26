// js script for part 1 Exercise:
const ex = '25, 26 \& 27';

// Import create button function.
import { createButton } from './functions.js';

// Import svg and line function from task22.js
import { createSvg, addLinesShape, addLinesCoor } from './task22.js';

// Reusing data from task 23.
const data = await d3.csv('../../data/part1/task23.csv');
// Task 26 data
const data2 = await d3.csv('../../data/part1/task26.csv');

// Append the svg element
const svg = createSvg(data, ex);

// Line 1
addLinesShape(data, svg, 'blue', 'triangle');

// Line 2
addLinesShape(data2, svg, 'red', 'circle');

// Modify container height.
d3.select('.container').style('height', '430px')

// Button for task action.
createButton(27);

// Button active. Button no longer does stuff once its clicked.
const buttonActive = true;

// Button action: adds task 27
d3.select('.buttonori').on('click', function(){
    while (buttonActive) {
        // Add Coor Text
        addLinesCoor(data, svg, 3);
        addLinesCoor(data2, svg, 2);
        buttonActive = false;
    }
});