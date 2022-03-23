
// Plotting Graph 1
// Graph Constants
const graph1margin = 60,
        buttonsMargin = 100,
        graph1width = 400 - graph1margin,
        graph1height = 400 - graph1margin - buttonsMargin;

let graph1svg;
// let graph1line;
// let horScale, verScale

/**
 * function to plot line graph.
 * @param {*} data 
 */
export function plotGraph1(data, type, selector) {

    // Create the svg object.
    graph1svg = d3.select(`#${selector}`)
                    .append('svg')
                        .attr('width', graph1width + graph1margin)
                        .attr('height', graph1height + graph1margin)
                        .append('g')
                            .attr('transform', `translate(${graph1margin + 15},${graph1margin/2})`);

    // Define the Axes
    const horScale = d3.scaleTime()
                        .domain(d3.extent(data.map(d => new Date(d.date))))
                        .range([0, graph1width]);
    const verScale = d3.scaleLinear()
                        .domain([0, d3.max(data.map(d => parseFloat(d[type])))])
                        .range([graph1height, 0]);

    // Adding the Axes
    graph1svg.append('g')
        .attr('class', `${selector}bottomAxes`)
        .attr('transform', `translate(0, ${graph1height})`)
        .call(d3.axisBottom(horScale));
    graph1svg.append('g')
        .attr('class', `${selector}leftAxes`)
        .call(d3.axisLeft(verScale));
    
    // Define a line.
    const graph1line = d3.line()
                    .x(d => horScale(new Date(d.date)))
                    .y(d => verScale(d[type]))

    // Add the initial path.
    graph1svg.append('path')
            .attr('class', `${selector}line`)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('d', graph1line(data))
}

export function updateGraph(dataUpdate, type, selector) {
    // Define the Axes
    const horScale = d3.scaleTime()
                        .domain(d3.extent(dataUpdate.map(d => new Date(d.date))))
                        .range([0, graph1width]);
    const verScale = d3.scaleLinear()
                        .domain([0, d3.max(dataUpdate.map(d => parseFloat(d[type])))])
                        .range([graph1height, 0]);
// 
    // Re-Call the Axes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    d3.selectAll(`.${selector}bottomAxes`)
        .transition()
            .duration(400)
            .ease(d3.easeLinear)
            .call(d3.axisBottom(horScale))
    d3.selectAll(`.${selector}leftAxes`)
        .transition()
            .duration(400)
            .ease(d3.easeLinear)
            .call(d3.axisLeft(verScale))
            
    // Define a line.
    const graph1line = d3.line().x(d => horScale(new Date(d.date)))
                .y(d => verScale(d[type]))

    // Update the svg line data.
    d3.selectAll(`.${selector}line`)
            .transition()
            .duration(400)
            .ease(d3.easeLinear)
            .attr('d', graph1line(dataUpdate))

    d3.select(`#${selector} svg`)
        .on('mousemove', (e, d) => {console.log(e)})
}