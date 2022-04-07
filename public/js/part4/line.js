import { getHDIData, getGDPData, getPopulationData, getListOfCountry } from './data.js';
import { addText, blurAllScatter } from './scatter.js';

// local variables
let linePlotSvg;
let linePlotWidth;
let linePlotHeight;
let margin;
const hdiData = await getHDIData();
const gdpData = await getGDPData();
const populationData = await getPopulationData();

/**
 * funcitons sets up the line plot
 */
export async function setupLine() {
    // plot constants
    const width = 500;
    const height = 360;
    margin = {
        top: 20,
        right: 45,
        bottom: 45,
        left: 60
    };
    linePlotWidth = width - margin.left - margin.right;
    linePlotHeight = height - margin.top - margin.bottom;

    // add the svg
    linePlotSvg = d3.select('#bottom-right-container')
                    .append('svg')
                        .attr('width', linePlotWidth + margin.left + margin.right)
                        .attr('height', linePlotHeight + margin.top+ margin.bottom)
                        .append('g')
                            .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // add Label
    linePlotSvg.append('text')
                .attr('transform', `translate(${-margin.left/4*3}, ${height*3/5}) rotate(-90)`)
                .style('font-size', '12px')
                .style('fill', 'white')
                .text('Human Development Index (HDI)');
    linePlotSvg.append('text')
                .attr('transform', `translate(${width / 2 - margin.left}, ${height - margin.bottom * 3 / 4})`)
                .style('font-size', '12px')
                .style('fill', 'white')
                .text('Year');

    // define the axes
    const horScale = d3.scaleTime()
                        // .domain(hdiData.map(d => d.Year))
                        .domain(d3.extent(hdiData.map(d => new Date(d.Year))))
                        .range([0, linePlotWidth]);
    // hdi values for the year
    const verScale = d3.scaleLinear()
                        .domain(d3.extent(hdiData.map(d => d.hdi)))
                        .range([linePlotHeight, 0]);

    // add the axes
    linePlotSvg.append('g')
        .attr('class', 'line-bottom-axes')
        .attr('transform', `translate(0, ${linePlotHeight})`)
        .attr('fill', 'white')
        .call(d3.axisBottom(horScale));
        // .selectAll('text')
        //         .attr('dy', '.35em')
        //         .attr('transform', 'rotate(-45)')
        //         .style('text-anchor', 'end');
    linePlotSvg.append('g')
        .attr('class', 'line-left-axes')
        .attr('fill', 'white')
        .call(d3.axisLeft(verScale));

    // add lines
    for (let item of await getListOfCountry()) {
        // current data based on country
        const data = hdiData.filter(d => d.Code == item);

        // define the line
        const line = d3.line()
                        .x(d => horScale(new Date(d.Year)))
                        .y(d => verScale(d.hdi));

        const hdiYear = data.find(d => d.Year == window.year).hdi;

        // add the path
        linePlotSvg.append('path')
            .attr('class', 'hdi-line')
            .attr('id', `hdi-line-${item}`)
            .attr('fill', 'none')
            .attr('opacity', 0.1)
            .attr('stroke', 'rgb(222, 222, 222)')
            .attr('stroke-width', '2px')
            .attr('d', line(data))
            .on('mouseover', () => {
                selectThisLine(item);
                blurAllScatter();
                
                // select specific scatter
                d3.select(`#scatter-${item}`)
                    .attr('opacity', 1.0);

                // constants
                const gdpCountry = gdpData.find(g => g['Country Code'] == item);
                const gdpVal = gdpCountry[window.year];
                const countryName = gdpCountry['Country Name'];
                const populationDensity = populationData.find(p => p['Country Code'] == item)[[window.year]];

                // add text back to scatter
                const selected = d3.select('#top-right-container svg g')
                addText(selected, countryName, 1);
                addText(selected, `GDP/Capita: ${Math.round(gdpVal * 1000) / 1000}`, 2);
                addText(selected, `HDI: ${Math.round(hdiYear * 1000) / 1000}`, 3);
                addText(selected, `Population Density: ${Math.round(populationDensity * 1000) / 1000}`, 4);

                // unblur country
                d3.select(`.map-path-${item}`)
                    .attr('fill-opacity', 1.0);

            })
            .on('mouseout', () => {
                // revert line
                d3.select(`#hdi-line-${item}`)
                    .attr('stroke', 'rgb(222, 222, 222')
                    .attr('stroke-width', '1px')
                    .attr('opacity', 0.1);

                // unblur scatter
                d3.selectAll('.scatter-circle')
                .attr('opacity', 0.6);

                // remove scatter tooltip
                d3.selectAll('.scatter-temp-text')
                    .remove();

                // unselect on map
                d3.selectAll(`.map-path-${item}`)
                    .attr('fill-opacity', 0.6);
            });
    }
}

export function selectThisLine(code) {
    // select the line
    d3.select(`#hdi-line-${code}`)
        .attr('stroke', 'white')
        .attr('stroke-width', '3px')
        .attr('opacity', 1.0);
}