// local variables
let lineSvg;

// function getHorScale() {
//     const horScale = 
// }

export async function setupLine() {
    // plot constants
    const width = 500;
    const height = 360;
    const margin = {
        top: 40,
        right: 20,
        bottom: 30,
        left: 40
    };
    const mapWidth = width - margin.left - margin.right;
    const mapHeight = height - margin.top - margin.bottom;

    // add the svg
    lineSvg = d3.select('#bottom-right-container')
                    .append('svg')
                        .attr('width', mapWidth + margin.left + margin.right)
                        .attr('height', mapHeight + margin.top+ margin.bottom)
                        .append('g')
                            .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // add Label
    lineSvg.append('text')
            .attr('transform', `translate(${-margin.left * 1.2}, ${height/2 + margin.bottom}) rotate(-90)`)
            .style('font-size', '12px')
            .text('GDP Per Capita (\$)');
    lineSvg.append('text')
            .attr('transform', `translate(${width / 2 - margin.left}, ${height + margin.bottom})`)
            .style('font-size', '12px')
            .text('Human Development Index');
}