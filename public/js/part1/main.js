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

// General Merge Task function
function mergeTask(first, second) {
    d3.select('.task' + second).remove();
    d3.select('.task' + first + ' a').html('Exercise ' + first + ' \& ' + second)
                                        .attr('href', d => 'task' + first + 'n' + second + '.html');
}

// Merge Exercises
mergeTask(3, 4)
mergeTask(12, 13)
mergeTask(14, 15)