/**
 * function gets the geojson file
 * @returns geojson file in .json format
 */
export async function getGeoJson() {
    return d3.json('../../data/part4/countries.json');
}

export async function getHDIData() {
    return d3.csv('../../data/part4/hdi.csv')
}