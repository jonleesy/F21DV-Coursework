// js script for part 1 home page

// Array of numbers [0, 1, 2, ..., 32] defining number of exercises
const data = Array.from(Array(33).keys());

// Creating links to 32 Exercises Systematically.
d3.select('body').selectAll('p')
    .data(data)
    .enter()
        // Append a <p> for each exercise and add an <a> for each <p>
        .append('p').style('text-align', 'center')
            .attr('class', d => 'task' + d)
            .append('a')
                .attr('href', d => 'task' + d +'.html')
                .html(d => 'Exercise ' + d);

// Merge Exercise 3 and 4
d3.select('.task4').remove();
d3.select('.task3 a').html('Exercise 3 \& 4')
                        .attr('href', d => 'task3n4.html')