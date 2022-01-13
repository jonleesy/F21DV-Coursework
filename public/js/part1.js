// js script for part 1

// Exercise 1
console.log('d3.version:', d3.version);
let task1 = d3.select('.task1').append('span');
task1.text(d3.version);

// Exercise 2
d3.selectAll('.task2').style('color', 'blue');
console.log('d3.version:', 'reach');

// Exercise 3
for (let i=1; i < 11; i++) {
    d3.select('.task3')
    .append('div')
    .attr('class', function() {
        return 'task3id' + i.toString()
    })
    .style('position', 'relative')
    .style('background-color', function() {
        if (i > 5) {
            return 'green'
        } else {
            return 'red'
        }
    })
    .style('text-align', 'center')
    .text(i.toString());
};

// Exercise 4
d3.select('#task4button').on('click', function() {
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