/**
 * Function plots a scatter plot of daths against GDP per capita
 * @param {*} selector div's id/class
 * @param {*} w width of plot
 * @param {*} h height of plot
 * @param {*} data data to do this
 */
export function clusterGraph(selector, w, h, data) {
        
    // Plot constants
    const margin = {top: 50, right: 20, bottom: 50, left: 40},
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

    // Max values for scale
    const deathMax = data.map(v => parseFloat(v[5]));
    const caseMax = d3.quantile(deathMax, 0.9);
    const gdpMax = data.map(v => parseFloat(v[4]));
    const gdpMaxVal = d3.quantile(gdpMax, 0.9);

    // Colour scale
    const colors = d3.scaleSequential()
                        .domain([0, caseMax])
                        .interpolator(d3.interpolateYlOrRd);
    
    // Add the svg
    const svg = d3.select(`.${selector}`)
                .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                        .attr('transform', `translate(${margin.left*2},${margin.top})`);                    
        
    // Define the Axes
    const horScale = d3.scaleLinear()
                        .domain([0, caseMax])
                        .range([0, width]);
    const verScale = d3.scaleLinear()
                        .domain([0, gdpMaxVal])
                        .range([height, 0]);

    // Adding the Axes
    svg.append('g')
        .attr('class', `${selector}bottomAxes`)
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(horScale))
        .selectAll('text')
            .style('text-anchor', 'end')
            .attr('transform', 'rotate(-65)');
    svg.append('g')
        .attr('class', `${selector}leftAxes`)
        .call(d3.axisLeft(verScale));

    // Add the dots.
    svg.selectAll('circle')
        .data(data)
        .enter()
            .append('circle')
            .attr('r', '5px')
            .attr('transform', d => {
                const x = horScale(parseFloat(d[5]));
                const y = verScale(parseFloat(d[4]));
                return `translate(${x}, ${y})`;
            })
            .style('fill', d => colors(d[5]))
            .attr('opacity', 0.4)
            .attr('stroke', d => colors(d[5]))
            .attr('stroke-width', '0.3px');

    // Add Label
    svg.append('text')
            .attr('transform', `translate(${-margin.left * 1.2}, ${height/2 + margin.bottom}) rotate(-90)`)
            .style('font-size', '12px')
            .text('GDP Per Capita (\$)');
    svg.append('text')
            .attr('transform', `translate(${width / 2 - margin.left}, ${height + margin.bottom})`)
            .style('font-size', '12px')
            .text('Total Deaths');
}