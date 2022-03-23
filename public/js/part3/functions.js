/**
 * Function to create new div's based on selector and className
 * To be used for adding div's to grid, as defined in styles.css
 * @param {*} selector The class/id name that d3 is going to select
 * @param {*} className Optional. Only use when in need to 
 * asign a class name to new div
 */
export function createDivs(selector, className = '', idName = '') {
    d3.select(`.${selector}`)
        .append('div')
            .attr('class', className)
            .attr('id', idName)
}