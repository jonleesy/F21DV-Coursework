import { updateGraph } from "./graph.js";

export function populateOthersDiv() {

    const selector = '#others-container';

    // Button clicl function
    function onClick() {
        updateGraph(window.worldData, 'new_cases', 'graph1');
        d3.selectAll(`.graph1 #graph1-default-option`)
            .property('selected', 'selected')
        d3.selectAll(`.graph1 #graph1-default-option`)
            .property('selected', 'selected')
        d3.selectAll('.graph-container span')
            .text('World')
        updateGraph(window.worldData, 'new_cases_smoothed', 'graph2');
    }

    // Add a button
    d3.select(selector)
        .append('button')
            .attr('background-color', '#808080')
            .attr('padding', '20px')
            .text('Reset Selection')
            .on('click', onClick)

    // Button's Instructions.
    d3.select(selector)
        .append('div')
        .append('p')
            .text('Button would reset all country and data type selection.');

    // Map Instructions title.
    d3.select(selector)
        .append('div')
        .append('strong')
        // .append('p')
            .text('Map Features:');
    // Button's Instructions.
    d3.select(selector)
        .append('div')
        // .append('p')
            .text(`Hovering on different parts of the map would highlight the country, and show the latest country stats. Upon clicking on the individual country, the graphs would show filtered data for that particular country.`);
    // Graph's Instructions.
    d3.select(selector)
        .append('div')
        // .append('p')
            .text(`Within the graphs, upon hover, a tooltip would display the date and data value for the selected date. There is also an option to select the data to be shown in the graph, from the dropdown below.`);


}
