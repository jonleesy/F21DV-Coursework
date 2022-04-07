// wdi data
const wdiData = await d3.csv('../../data/part4/wdi.csv');

// code constant
const codes = {
    gdp: 'NY.GDP.PCAP.KD',
    population: 'EN.POP.DNST'
}

/**
 * function gets the geojson file
 * @returns geojson file in .json format
 */
export async function getGeoJson() {
    return d3.json('../../data/part3/geojson.json');
}

export async function getHDIData() {
    return d3.csv('../../data/part4/hdi.csv');
}

export async function getGDPData() {
    return wdiData.filter(d => d['Indicator Code'] === codes.gdp);
}

export async function getPopulationData() {
    return wdiData.filter(d => d['Indicator Code'] === codes.population);
}