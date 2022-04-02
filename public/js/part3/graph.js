// Graph Constants
const graph1margin = 60,
        buttonsMargin = 100,
        graph1width = 400 - graph1margin,
        graph1height = 400 - graph1margin - buttonsMargin;
// Graph svg constant
let graph1svg;
let type1, type2;

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

    // Add Tooltip
    const tooltipGroup = graph1svg.append('g')
                                    .attr('class', 'graph-tooltip')
                                    .attr('id', `${selector}-tooltip`)
                                    .attr('transform', `translate(${graph1width/2}, ${graph1height/2})`);
    const rectConst = {height: 40, width: 100, margin: 8};
    tooltipGroup.append('rect')
                .attr('width', rectConst.width)
                .attr('height', rectConst.height)
                .style('fill', '#e6e6e6')
                .attr('transform', `translate(${-rectConst.width - rectConst.margin}, ${-rectConst.height - rectConst.margin})`);                                
    // Add tooltop Circle.
    tooltipGroup.append('circle')
                .attr('stroke', '#3333cc')
                .style('fill', 'none')
                .attr('r', '5px')
                .attr('stroke-width', '1px');
    // Add a text beside the circle
    tooltipGroup.append('text')
                .attr('class', 'graph-tooltip-date')
                .text('date')
                .style('text-anchor', 'end')
                .style('font-size', '15px')
                .attr('transform', `translate(${-rectConst.margin * 1.5}, ${-rectConst.margin * 4})`);
    tooltipGroup.append('text')
                .attr('class', 'graph-tooltip-data')
                .text('data')
                .style('text-anchor', 'end')
                .style('font-size', '15px')
                .attr('transform', `translate(${-rectConst.margin * 1.5}, ${-rectConst.margin * 2})`);
    // Hide it for now.
    d3.selectAll('.graph-tooltip')
        .attr('opacity', '0')
}

export function updateGraph(dataUpdate, type, selector) {

    // Store the laternate type
    if (selector == 'graph1') {
        type1 = type;
    } else {
        type2 = type;
    }

    // Dates extent
    const datesExtent = d3.extent(dataUpdate.map(d => new Date(d.date)));

    // Define the Axes
    const horScale = d3.scaleTime()
                        .domain(datesExtent)
                        .range([0, graph1width]);
    const verScale = d3.scaleLinear()
                        .domain([0, d3.max(dataUpdate.map(d => parseFloat(d[type])))])
                        .range([graph1height, 0]);

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
    const graph1line = d3.line()
                        .x(d => horScale(new Date(d.date)))
                        .y(d => verScale((d[type])))

    // Update the svg line data.
    d3.selectAll(`.${selector}line`)
            .transition()
            .duration(400)
            .ease(d3.easeLinear)
            .attr('d', graph1line(dataUpdate))
            .attr('stroke', '#3e434a')

    // Mousemove function
    async function mouseMove(e) {
        // Alternate options.
        // To be used to mark the other graph's tooltip.
        const selector2 = (selector == 'graph1') ? 'graph2' : 'graph1';
        const type_2 = (selector == 'graph1') ? type2 : type1;
        
        // Second alternate scale
        const verScale2 = d3.scaleLinear()
                            .domain([0, d3.max(dataUpdate.map(d => parseFloat(d[type_2])))])
                            .range([graph1height, 0]);

        // To check pointer position
        const xAxisVal = d3.pointer(e)[0] - 60;

        // Tooltip to not show if mouse is beyong the lower limt of the x axis.
        if (xAxisVal > 0) {
            // Full date, both graphs should share same date.
            const x0 = horScale.invert(xAxisVal);
            // Convert to csv date format
            const tempDate = getFormattedDate(x0);
            // Actual filtered data for the day.
            const tempData = await dataUpdate.filter(d => d['date'] == tempDate)
            // Actual data values
            let dataValue1 = (tempData.length < 1) ? 0 : tempData[0][type];
            let dataValue2 = (tempData.length < 1) ? 0 : tempData[0][type_2];
            // Scaled values
            const xVal = horScale(new Date(tempDate));
            const yVal1 = verScale(dataValue1);
            const yVal2 = verScale2(dataValue2);
            // Selected graph
            if (xVal && yVal1) {
                d3.select(`#${selector} .graph-tooltip`)
                    .attr('transform', `translate(${xVal}, ${yVal1})`)
                    .attr('opacity', '1.0')
            } else {
                d3.select(`#${selector} .graph-tooltip`)
                    .attr('transform', `translate(0,0)`)
                    .attr('opacity', '0.0')
            }
            d3.select(`#${selector} .graph-tooltip-date`)
                .text(tempDate)
            d3.select(`#${selector} .graph-tooltip-data`) 
                .text(() => {
                    const textVal = parseInt(dataValue1);
                    return isNaN(textVal) ? 0 : textVal;
                })
            // Alternate graph
            if (xVal && yVal2) {
                d3.select(`#${selector2} .graph-tooltip`)
                    .attr('transform', `translate(${xVal}, ${yVal2})`)
                    .attr('opacity', '1.0')
            } else {
                d3.select(`#${selector2} .graph-tooltip`)
                    .attr('transform', `translate(0,0)`)
                    .attr('opacity', '0.0')
            }
            d3.select(`#${selector2} .graph-tooltip-date`)
                .text(tempDate)
            d3.select(`#${selector2} .graph-tooltip-data`) 
                .text(() => {
                    const textVal = parseInt(dataValue2);
                    return isNaN(textVal) ? 0 : textVal;
                })
        }
    }

    function mouseLeave() {
        const selector2 = (selector == 'graph1') ? 'graph2' : 'graph1';
        d3.select(`#${selector} .graph-tooltip`)
                .attr('transform', `translate(0,0)`)
                .attr('opacity', '0.0')
        d3.select(`#${selector2} .graph-tooltip`)
                .attr('transform', `translate(0,0)`)
                .attr('opacity', '0.0')
    }

    // Hover action – add tooltip
    d3.select(`#${selector} svg`)
        .on('mousemove', mouseMove)
        .on('mouseleave', mouseLeave)
}

function getFormattedDate(date) {
    const tempDate = new Date(date);
    return `${tempDate.getFullYear()}-${('0' + tempDate.getMonth()).slice(-2)}-${('0' + tempDate.getDate()).slice(-2)}`;
}