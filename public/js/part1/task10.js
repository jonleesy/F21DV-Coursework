// js script for part 1 Exercise:
const ex = 10;

// Create Divs and button systematically using a genral function.
import {createDiv} from '../functions.js';
createDiv(ex);

// Data from csv
let dataCsv = d3.csv('https://raw.githubusercontent.com/akmand/datasets/master/heart_failure.csv');

// Function that gets the numbers for this task and task 14 & 15
async function getData() {
    const data = await dataCsv;
    let young = 0;
    let mid = 0;
    let old = 0;
    let veryold = 0;
    for (const row of data) {
        if (parseInt(row.age) <= 30) {
            young ++;
        } else if (parseInt(row.age) <= 40) {
            mid ++;
        } else if (parseInt(row.age) <= 60) {
            old ++; 
        } else {
            veryold ++;
        }
    }
    // Adding a '0' since d3 will skip "young = 0".
    return ['0', young, mid, old, veryold]
}

// Bind above variables to be used as data.
d3.select('.answerCenter').selectAll('p')
    .data(await getData())
    .enter()
        .append('p')
        .text(function(d, i) {
            let msg = d.toString() + ' people with age ';
            switch (i) {
                case 1: msg += '1-31'; break;
                case 2: msg += '31-40'; break;
                case 3: msg += '41-60'; break;
                case 4: msg += '61-100';
            }
            msg = msg + ' have heart disease.';
            return msg;
        });

// Function for task 14 & 15.
export async function exportData() {
    const expData = await getData();
    return [{name: "1-31", value: expData[1]},
            {name: "31-40", value: expData[2]},
            {name: "41-60", value: expData[3]},
            {name: "61-100", value: expData[4]},]
}