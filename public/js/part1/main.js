// js script for part 1 home page

// Array of numbers [0, 1, 2, ..., 32] defining number of exercises
const data = Array.from(Array(33).keys());

// Creating links to 32 Exercises Systematically.
d3.select('body').selectAll('p')
    .data(data)
    .enter()
        // Append a <p> for each exercise and add an <a> for each <p>
        .append('p').style('text-align', 'center') 
            .append('a')
                .attr('href', d => 'task' + d +'.html')
                .attr('class', 'task' + d)
                .html(d => 'Exercise ' + d);

// Merge task 3 and 4