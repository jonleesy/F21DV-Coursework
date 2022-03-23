// Use a function call to obtain yesterday's date
const yesterday = (function() {
                        this.setDate(this.getDate()-1); return this
                    }).call(new Date);
// const yesterdayDate = `${yesterday.getFullYear()}-${('0' + yesterday.getMonth()).slice(-2)}-${('0' + yesterday.getDate()).slice(-2)}`;
const yesterdayDate = '2022-03-14'

// Global Variables
// const geojson = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';
// const covidDataCsv = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv';
// Local storage for faster read.
const geojson = '../../data/part3/geojson.json';
const covidDataCsv = '../../data/part3/covid.csv';
// const variablesCsv = '../../data/part3/variable.csv';
const data = await d3.csv(covidDataCsv);

/**
 * @returns data array of covid numbers from most recent date.
 */
export async function getLatestCase() {
    let yesterdayData = new Array();
    yesterdayData.push(['TKM', 'no data', 'Turkmenistan', 'no data', '0', '0']);
    yesterdayData.push(['ABV', 'no data', 'Somaliland', 'no data', '0', '0']);
    yesterdayData.push(['ESH', 'no data', 'Western Sahara', 'no data', '0', '0']);
    data.forEach(function(d, _) {
        if (d.date === yesterdayDate) {
            // yesterdayData.push({'countryCode': d.iso_code, 'newCasesPerMil': d.new_cases_per_million})
            let new_cases_smoothed_per_million = d.new_cases_smoothed_per_million;
            let new_cases_smoothed = d.new_cases_smoothed;
            let gdp_per_capita = d.gdp_per_capita;
            let total_deaths = d.total_deaths;
            if (d.new_cases_smoothed_per_million == '') {
                new_cases_smoothed_per_million = d.new_cases_per_million;
            }
            if (new_cases_smoothed_per_million == '') {
                new_cases_smoothed_per_million = 'no data';
            }
            if (d.new_cases_Smoothed == '') {
                new_cases_smoothed = d.new_cases;
            }
            if (new_cases_smoothed == '') {
                new_cases_smoothed = 'no data';
            }
            if (d.gdp_per_capita == '' || 0) {
                gdp_per_capita = '0';
            }
            if (d.total_deaths == '' || 0) {
                total_deaths = '0';
            }
            yesterdayData.push([d.iso_code, new_cases_smoothed_per_million, d.location, new_cases_smoothed, gdp_per_capita, total_deaths]);
        }
    }); 
    return yesterdayData;
}

/**
 * Map data for drawing the map.
 */
export async function mapData() {
    // Final deliverable promisses.
    let promisses = [];

    // Push Data
    promisses.push(d3.json(geojson));

    // Data Promise
    return promisses;
}

/**
 * Function rounds values to 2 decimal float
 * @param {*} number input number
 * @returns same number but 2 decimal float
 */
export function round2Decimal(number) {
    if (number !== 'no data') {
        return Math.round(number * 100) / 100;
    } else {
        return number;
    }
}

/**
 * returns the sum of an array in 2 decimals.
 * @param {*} array input array
 * @returns output flot in 2 decimals
 */
export function sumValuesArray(array) {
    let sum = 0;
    for (const item of array) {
        if (item || item !== 'no data') {
            sum = sum + item;
        }
    }
    return round2Decimal(sum);
}

/**
 * return data based on given country name.
 * @param {*} id 
 * @returns 
 */
export async function getCountryData(id) {
    return data.filter(c => c.iso_code == id)
}