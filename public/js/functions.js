// Functions used to set up basic page headers, titles, nav bar, etc. 

/**
 * Create div's for each question systematically.
 * @param {*} exerciseNumber Task number.
 */
export function createDiv(exerciseNumber) {
    d3.select('body')
        .append('div')
            .attr('class', 'container')
            .append('div')
                .attr('class', 'answerCenter')
                .append('p')
                    .append('strong')
                        .text('Exercise ' + exerciseNumber + ':')
}

/**
 * Similar to createDiv(). Was told to look into 
 * grid instead of using hard coded div settings.
 * This one focuses on that, and will be used starting 
 * from lab2.
 * @param {*} exerciseNumber 
 */
export function createAnswerDiv(exerciseNumber) {
    d3.select('body')
        .append('div')
            .attr('class', 'grid-container')
            .append('div')
                .attr('class', 'title-grid')
                .append('p')
                        .append('strong')
                            .text('Exercise ' + exerciseNumber + ':')
    d3.select('.grid-container')
        .append('div')
        .attr('class', 'answer-grid')
}

/**
 * Similar to createDiv(). Was told to look into 
 * grid instead of using hard coded div settings.
 * This one focuses on that, and will be used starting 
 * from lab2.
 * @param {*} exerciseNumber 
 */
export function createAnswerDivSmall(exerciseNumber) {
    d3.select('body')
        .append('div')
            .attr('class', 'grid-container')
            .append('div')
                .attr('class', 'title-grid')
                .append('p')
                        .append('strong')
                            .text('Exercise ' + exerciseNumber + ':')
    d3.select('.grid-container')
        .append('div')
        .attr('class', 'answer-grid-small')
}

/**
 * Creates a button to execute action for each task.
 * @param {*} exerciseNumber 
 */
export function createButton(exerciseNumber) {
    d3.select('body')
        .append('div').attr('class', 'container')
            .append('div').attr('class', 'center')
                .append('button')
                    .attr('class', 'buttonori')
                    .text('Click for Task ' + exerciseNumber)
}

/**
 * Creating links to 32 Exercises Systematically.
 * (Now a generalised function for rest of the Labs)
 * @param {*} exNumberData
 */
 export function createExercisesUrl(exNumberData) {
    d3.select('body').selectAll('p')
    .data(exNumberData)
    .enter()
        // Append a <p> for each exercise and add an <a> for each <p>
        .append('p').style('text-align', 'center')
            .attr('class', d => 'task' + d)
            .append('a')
                .attr('href', d => 'task' + d +'.html')
                .html(d => 'Exercise ' + d);
}

/**
 * General Merge Function. If its just 2 consecutive exercise, ignore 3rd and 4th parameter. 
 * However, if merge is for a range of exercises, spanning more than 2, only enter the 
 * first and last exercise number.
 * @param {*} first first exercise to merge
 * @param {*} second second exercise to merge. Last exercise if there are more than 2 exercises.
 * @param {*} cond1 used to change exercise <number> to Exercise <number> to <number>
 * @param {*} cond2 used to rename html file to task<first>n<second>.html
 */
 export function mergeTask(first, second, cond1 = ' \& ', cond2 = 'n') {
    d3.select('.task' + second).remove();
    d3.select('.task' + first + ' a').html('Exercise ' + first + cond1 + second)
                                        .attr('href', d => 'task' + first + cond2 + second + '.html');
}


/** Remove task function */
export function removeTask(task, message) {
    d3.select(`.task${task} a`).remove();
    d3.select(`.task${task}`).append('p')
                            .text(message);
}