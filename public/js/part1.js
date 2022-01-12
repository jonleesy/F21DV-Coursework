// js script for part 1

// Exercise 1
console.log('d3.version:', d3.version);
let task1 = d3.select('.task1').append('span')
task1.text(d3.version);

// Exercise 2
d3.selectAll('.task2').style('color', 'blue');
console.log('d3.version:', 'reach');