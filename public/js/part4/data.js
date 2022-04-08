/**
 * @module this module is for processes data for the dashboard
 * @copyright Jonathan Lee 2022
 */

// wdi data - preprocessed using python
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

/**
 * function gets the hdi data
 * @returns array [entity, code, year, hdi] of hdi data
 */
export async function getHDIData() {
    return d3.csv('../../data/part4/hdiori.csv');
}

/**
 * function gets the hdi data, except with slight modified data for quick read
 * @returns array of hdi data
 */
export async function getHDIDataSlider() {
    return d3.csv('../../data/part4/hdi.csv');
}

/**
 * function filters the wdi csv file
 * @returns an array of only gdppdata from the main csv file for quick read
 */
export async function getGDPData() {
    return wdiData.filter(d => d['Indicator Code'] === codes.gdp);
}

/**
 * function filters the wdi csv file
 * @returns an array of only population density from the main csv file for quick read
 */
export async function getPopulationData() {
    return wdiData.filter(d => d['Indicator Code'] === codes.population);
}

/**
 * functions gets a list of countries with HDI record
 * @returns returns a list of countries with HDI data
 */
export async function getListOfCountry() {
    // get an array of country code
    const countryCode = (await getHDIData()).map(d => d.Code);
    const uniqueCode = new Array();

    // look for unique items only
    for (let item of countryCode) {
        if (!uniqueCode.includes(item)) {
            uniqueCode.push(item);
        }
    }

    return uniqueCode;
}