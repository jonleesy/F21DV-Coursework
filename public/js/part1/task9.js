// js script for part 1 Exercise:
const ex = 9;

// Create Div Systematically using a genral function.
import {createDiv} from './functions.js';
createDiv(ex);

// Data from csv.
let dataCsv = 'https://raw.githubusercontent.com/dsindy/kaggle-titanic/master/data/test.csv';

// Using a predefined variable for d3 in queston 9.
let selection9 = d3.select('.container .answerCenter');
d3.csv(dataCsv).then(function(data) {
    // Local Variables for <p> print statements.
    let mr = 0, mrs = 0, other = 0;
    let male = 0, female = 0;
    let totalFare = 0;

    // Iterate thrugh every entry of data.
    data.forEach(function(d) {
        // Using local variables to store names and sex for if statements.
        let n = d.Name;
        let s = d.Sex;

        // Add 1 for each entries that have 'Mr.' and 'Mrs.' respectively. 
        if (n.includes('Mr.')) {
            mr ++;
        } else if (n.includes('Mrs.')) {
            mrs ++;
        } else {
            other ++;
        }

        // To check and count entries to see how many male and female on board.
        if (s === 'male') {
            male ++;
        } else if (s == 'female') {
            female ++;
        }

        // Calculate the average fare for passenger.
        if (!Number.isNaN(parseFloat(d.Fare))) {
            totalFare += parseFloat(d.Fare);
        }
    });
    
    // Using results to append paragrpahs for this div.
    selection9.append('p').text('A total of ' + mr.toString() + ' passengers identifies as Mr.');
    selection9.append('p').text('A total of ' + mrs.toString() + ' passengers identifies as Mrs.');
    selection9.append('p').text('A total of ' + other.toString() + ' passengers identifies as neither.');
    selection9.append('p').text('There are ' + male + ' male and ' + female + ' female passengers.');
    selection9.append('p').text('Average fare per passenger is: ' + Number((totalFare/(data.length)).toFixed(2)) + '.');
});