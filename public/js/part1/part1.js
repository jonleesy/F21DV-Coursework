// js script for part 1 home page

// Array of numbers [1, 2, ..., 33] defining number of exercises
const data = Array.from(Array(33).keys());

// Creating links to 32 Exercises Systematically.
d3.select('body').selectAll('p')
    .data(data)
    .enter()
        // Append a <p> for each exercise and add a <a> for each <p>
        .append('p').style('text-align', 'center') 
            .append('a')
                .attr("href", d => 'part1exercise' + d +'.html')
                .html(d => 'Exercise ' + d);