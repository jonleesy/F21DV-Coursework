// js script for part 1 Exercise:
const ex = 10;

// Create Div Systematically using a genral function.
import {createDiv} from './functions.js';
createDiv(ex);

// Data from csv
let dataCsv = ('https://raw.githubusercontent.com/akmand/datasets/master/heart_failure.csv');

d3.csv(dataCsv).then(function(data) {
    // Create local variables for 4 ranges of age.
    let young = 0;
    let mid = 0;
    let old = 0;
    let veryold = 0;
    data.forEach(function(d) {
        // Checking if heart failure falls into age range.
        if (parseInt(d.age) <= 30) {
            young ++;
        } else if (parseInt(d.age) <= 40) {
            mid ++;
        } else if (parseInt(d.age) <= 60) {
            old ++; 
        } else {
            veryold ++;
        }
    });
    // Bind above variables to be used as data.
    d3.select('.answerCenter').selectAll('p')
        .data([0, young, mid, old, veryold])
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
});
