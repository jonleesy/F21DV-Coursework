/**
 * @module module aims at setting up slider 
 * @copyright Jonathan Lee 2022
 */

import { getHDIDataSlider } from './data.js'
import { updateDashboard } from './functions.js';

// hdi data
const hdiData = await getHDIDataSlider();

/**
 * function setups the slider
 */
export async function setupSlider() {
    // min and max dates
    const datesExtent = d3.extent(hdiData.map(d => parseInt(d.Year)));

    // svg constants
    const width = 1200;
    const height = 100;
    const margin = {
        top: 50,
        right: 50,
        bottom: 0,
        left: 100
    }
    const sliderHeight = height - margin.top - margin.bottom;
    const sliderWidth = width - margin.left - margin.right;

    // define the svg
    const sliderSvg = d3.select('.year-container')
                        .append('svg')
                            .attr('height', sliderHeight + margin.top + margin.bottom)
                            .attr('width', sliderWidth + margin.left + margin.right)
                            .append('g')
                                .attr('transform', `translate(${margin.left - 20}, ${margin.top/2})`);

    // add text
    sliderSvg.append('text')
                .attr('fill', 'white')
                .attr('class', 'slider-text')
                .text('2017')
                .attr('transform', `translate(${-margin.left*3/5}, ${5})`)

    // define the slider
    const slider = d3.sliderBottom()
                        .min(datesExtent[0])
                        .max(datesExtent[1])
                        .width(sliderWidth)
                        .tickFormat(d3.format('d'))
                        .default(2017)
                        .ticks(30)
                        .step(1)
                        .on('onchange', d => {
                            const result = (d == 1989) ? 1985 : (d == 1988) ? 1980 : Math.round(d);
                            d3.select('.slider-text')
                                .text(result);

                            // update the map
                            updateDashboard(Math.round(result));
                        });

    // call the slider                        
    sliderSvg.call(slider);

    // rename slider
    const ticks = d3.selectAll('.tick text');
    ticks.attr('class', (_, i) => `ticks-slider-${i}`);
    d3.select('.ticks-slider-43').text('1980');
    d3.select('.ticks-slider-44').text('1985');
}