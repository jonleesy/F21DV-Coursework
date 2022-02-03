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

/**
 * General Merge Function. If its just 2 consecutive exercise, ignore 3rd and 4th parameter. 
 * However, if merge is for a range of exercises, spanning more than 2, only enter the 
 * first and last exercise number.
 * @param {*} first first exercise to merge
 * @param {*} second second exercise to merge. Last exercise if there are more than 2 exercises.
 * @param {*} cond1 used to change exercise <number> to Exercise <number> to <number>
 * @param {*} cond2 used to rename html file to task<first>n<second>.html
 */
function mergeTask(first, second, cond1 = ' \& ', cond2 = 'n') {
    d3.select('.task' + second).remove();
    d3.select('.task' + first + ' a').html('Exercise ' + first + cond1 + second)
                                        .attr('href', d => 'task' + first + cond2 + second + '.html');
}

// Remove task function
function removeTask(task, message) {
    d3.select(`.task${task} a`).remove();
    d3.select(`.task${task}`).append('p')
                            .text(message);
}

// Merge Exercises
mergeTask(3, 4)
mergeTask(12, 13)
mergeTask(14, 15)
mergeTask(18, 19)
mergeTask(25, 27, ' to ', 'to')
mergeTask(30, 31)

// Remove Exercises
removeTask(22, "Exercise 22 was just to create a function for next two questions.")
removeTask(26, '')