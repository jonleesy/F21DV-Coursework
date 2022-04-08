/**
 * @module this module adds description and text to the content section
 * @copyright Jonathan Lee 2022
 */

/**
 * this function systematically adds div (or paragraph) to the content section
 * @param {*} text text to add
 * @param {*} type ttext size, h1, h2, h3,... etc. default: 'p'
 */
function addText(text, type = 'p') {
    d3.select('.content-container')
        .append('div')
            .append(type)
                .html(text);
}

// href constants
const covid19 = `<a class="active" href='../../html/part3/main.html'>Covid-19</a>`;
const ref1 = `<a href='https://datatopics.worldbank.org/world-development-indicators/stories/statistical-performance-indicators.html'>[1]</a>`;
const ref2 = `<a href='https://medium.com/4thought-studios/human-development-index-the-new-gdp-34ce23fc8bd1'>[2]</a>`;

/**
 * main function for the content module
 */
export function setupContent() {
    addText(`*<em>Population Density (people per sq. km of land area), GDP/Capita (US \$)</em>`)
    addText('Human Development Index (HDI) vs GDP Per Capita', 'h2');
    addText(`Over the years, the world has turned to Gross Domestic Product (GDP) Per Capita
            when looking at the development levels of a specific country. This has proven to
            be effective until studies have shown that statistical systems such as this has
            no regard to the society and environment aspects of an economy, and tend to only
            focus on the growth of industrial and government sectors without factoring in the
            role of every citizen ${ref1}.`);
    addText(`In light of the recent events such as the ${covid19} pandemic, Russian-Ukrain war,
            and world-wide fuel crisis, and seeing see how different nations of different development
            levels react to such events, we should all be made aware of the different development
            levels of a country.`);
    addText(`HDI, as its name suggest, emphasises on the human development, and factors in the
            quality of life, and not just 'how much money the country can make' ${ref2}. For instance,
            Korea and The Bahamas both have GDP/Capita of around \$30,000, but Korea is miles ahead
            in terms of its HDI value. This lay terms, it means that the Koreans are earning good
            amount of money, yet they also have a good quality of life. Another example would be
            with malaysia, whilst having a lower GPD/Capita of about \$10,000, they still have the
            same HDI value as The Bahamas.`)
    addText(`Can HDI be a viable gauge for a Country's Development?`, 'h2')
    addText(`Looking at the scatter plot on the top right of the dash, the x-axis represents the
            GDP/capita value, the y-axis represents the HDI value, and the radius of each circle
            represents the population density of a nation. From the scatter plot, we could see that
            there lies a logarithmic relationship between HDI and GDP/Capita.`)
}

