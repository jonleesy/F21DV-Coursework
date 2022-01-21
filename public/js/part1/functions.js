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