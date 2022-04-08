import { getHDIDataSlider, getListOfDates } from './data.js'
import { updateDashboard } from './functions.js';

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
                        // .tickFormat(d3.format('.2%'))
                        .default(2017)
                        .ticks(30)
                        .step(1)
                        .on('onchange', d => {
                            d3.select('.slider-text')
                                .text(Math.round(d))
                        });

    // call the slider                        
    sliderSvg.call(slider);

    // rename slider
    const ticks = d3.selectAll('.tick text');
    ticks.attr('class', (_, i) => `ticks-slider-${i}`);


    // // slider const
    // let moving = false;
    // let currentValue = datesExtent[1];
    // let timer;

    // const playButton = d3.select('#play-button');

    // const horScale = d3.scaleTime()
    //                     .domain(datesExtent)
    //                     .range([0, sliderWidth])
    //                     .clamp(true);

    // const slider = sliderSvg.append('g')
    //                     .attr('class', 'slider')
    //                     .attr('transform', `translate(${margin.left}, ${sliderHeight/2})`);

    // slider.append('line')
    //         .attr('class', 'tarck')
    //         .attr('x1', horScale.range[0])
    //         .attr('x2', horScale.range[1])
    //         // .select(() => {return this.parentNode.appendChild(this.cloneNode(true))})
    //         //     .attr('class', 'track-inset')
    //         // .select(() => {return this.parentNode.appendChild(this.cloneNode(true))})
    //         //     .attr('class', 'track-overlay')
    //             .call(d3.drag()
    //                     .on('start.interupt', () => {slider.interrupt()})
    //                     .on('start drag', () => {
    //                         currentValue = d3.event.x;
    //                         updateDashboard(x.invert(currentValue));
    //                     }));

    // slider.insert('g', '.track-overlay')
    //     .attr('class', 'ticks')
    //     .attr('transform', `translate(0, 18)`)
    //     .selectAll('text')
    //         .data(await getListOfDates())
    //         .enter()
    //             .append('text')
    //                 .attr('x', horScale)
    //                 .attr('y', 10)
    //                 .attr('text-anchor', 'middle')
    //                 .text((d) => d);

    // const handle = slider.insert('circle', '.track-overlay')
    //                         .attr('class', 'handle')
    //                         .attr('r', 9);

    // const label = slider.append('text')
    //                     .attr('class', 'label')
    //                     .attr('text-anchor', 'middle')
    //                     .text(datesExtent[1])
    //                     .attr('transform', `translate(${horScale.range[1]}, -25)`);

    // // play button
    // playButton.on('click', () => {
    //     const button = d3.select(this);
    //     if (button.text() == 'Pause') {
    //         moving = false;
    //         timer = 0
    //         clearInterval(timer);
    //         button.text('Play');
    //     } else {
    //         moving = true;
    //         timer = setInterval(step, 100);
    //         button.text('Pause');
    //     }
    // });

    // function prepare(d) {
    //     d.id = d.id;
    //     d.date = parseDate(d.date);
    //     return d;
    // }
}