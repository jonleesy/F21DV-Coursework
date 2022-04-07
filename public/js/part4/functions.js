/**
 * Function adds a div systematically to an existing div
 * @param {*} targetClass div's class where div is being added to
 * @param {*} className name of class of newly added div
 * @param {*} idName name of id of newly added div
 * @param {*} textDisplay text to display in the div
 */
function addDiv(targetClass, className = '', idName = '') {
  d3.select(targetClass)
    .append('div')
        .attr('class', className)
        .attr('id', idName);
}

export async function setup() {
    // add the divs
    addDiv('body', 'grid-container');
    addDiv('.grid-container', 'main-container');
    addDiv('.main-container', 'main-container-div', 'map-container');
    addDiv('.main-container', 'main-container-div', 'top-right-container');
    addDiv('.main-container', 'main-container-div', 'bottom-right-container');
    addDiv('.grid-container', 'year-container');

    // add footer
    await d3.text('../../data/part4/footer.txt').then((d) => {
        addDiv('.grid-container', 'footer-container', '');
        d3.select('.footer-container')
            .text(d);
    })
}

