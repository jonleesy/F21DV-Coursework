// Local Variables
// Svg Constants
const xSize = 400, ySize = 400, margin = 40, xMax = xSize - margin*2, yMax = ySize - margin*2;

/**
 * Creates and appends the SVG and its axes. Similar to 
 * createSvg() from part 1 – task22.js, difference is that
 * this one will have to adapt to the change to css grids.
 * @param {*} data data of plots
 * @returns Svg element, the X and Y axis scaler.
 */
export function createSvg(data) {
    // Extreme Values of X and Y
    const xExtent = d3.extent(data, d => d.x);
    const yExtent = d3.extent(data, d => d.y);

    // Create and apend the svg object.
    const svg = d3.select('.answer-grid')
                    .append('svg')
                        .attr('width', xSize)
                        .attr('height', ySize)
                        .append('g')
                            .attr('transform', `translate(${margin}, ${margin})`);

    // Define the horizontal scale.
    const horScale = d3.scaleLinear()
                        .domain([xExtent[0], xExtent[1]])
                        .range([0, xMax]);

    // Define the vertical scale.
    const verScale = d3.scaleLinear()
                        .domain([yExtent[0], yExtent[1]])
                        .range([yMax, 0]);

    // x axis.
    svg.append('g')
        .attr('transform', `translate(0, ${yMax})`)
        .call(d3.axisBottom(horScale));

    // y axis.
    svg.append('g')
        .call(d3.axisLeft(verScale));

    return {svg, horScale, verScale};
};