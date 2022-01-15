// js script for part 1

// Exercise 1
// Adding a span after div with class: "task1".
// d3 select then is stored in const task1.
let task1 = d3.select('.task1').append('span');
// Then setting the text to show version of d3
task1.text(d3.version);

// Exercise 2
// Out of the 3 divs, first and last was classed as "task2".
// Selecting those that were named "task2" and changing the 
// font colour to blue
d3.selectAll('.task2').style('color', 'blue');

// Exercise 3
// Loop for 10 divs, where each has "task3" classed div as
// parent div.
for (let i=1; i < 11; i++) {
    d3.select('.task3') // Select "task3".
        .append('div') // Add a div each iteration.
        .attr('class', function() { // For each div, we assign a unique class name.
            return 'task3id' + i.toString()
        })
        .style('position', 'relative') // Set a relative positon, they stack on one another.
        .style('background-color', function() { // Conditioned background colour.
        if (i > 5) {
            return 'green'
        } else {
            return 'red'
        }
        })
        .style('text-align', 'center') // Align text for each div to center.
        .text(i.toString()); // For each iteration, i is the text for that div.
};

// Exercise 4
// d3 to select "task4button" and add an event listener that listens
// for the click event.
d3.select('#task4button').on('click', function() {
    // Conditioned d3 modificaton of the first div.
    // If the first div has its original value, modify and
    // replace value with "start" and colour purple.
    // Else, if its purple with value "start", modify and
    // replace value with original "1"
    // Modification is on: div's BG color, text colour, and
    // the div's text.
    if (d3.select('.task3id1').text() == '1') {
        d3.select('.task3id1')
            .style('background-color', 'purple')
            .style('color', 'white')
            .text('start');
    } else {
        d3.select('.task3id1')
            .style('background-color', 'red')
            .style('color', 'black')
            .text('1');        
    }
});

// Exercise 5
// Practice on chained commands. Select "task5" div, then add another div
// that says "Hello World!" and style it in green text.
d3.select('.task5').append('div').text('Hello World!')
    .style('color','green');

// Exercise 6
// Add "color" in otherdata
let otherdata = [{name:'test', val:1, color:'red'},
                {name:'other', val:2, color:'green'}, 
                {name:'b',     val:3, color:'blue'}];
// Select "container6" > "answercenter" > all its child divs,
// then use the data method to instantiate "otherdata" as the data for d3, then using the
// .text() function, add a nested function that returns the wanted name + colour 
// for text of said div. Then, using the .style() funciton, we style the text to its respective colour
d3.select('.container6').select('.answercenter').selectAll("div")
    .data(otherdata)
    .text(function (d, i) {
        // console.log("d.name: " + d.name);
        // console.log("d.val: " + d.val);
        // console.log("i: " + i); 
        // console.log("this: " + this);
        return i+1 + '. cont: ' + d.name + '; color: ' + d.color; // return value is used to set the 'text'
    })
    .style('color', function (d, i) {
        return d.color
    });

// Exercise 7
// Predefine selected element
const selected7 = d3.select('.container7').select('.answercenter');
// Using d3, we populate container 7 with 4 divs.
for (let i=0; i < 4; i++) {
    selected7.append('div')
};
// Given number array.
let num = [10, 50, 100, 200];
// Using the selected, provide data (num) for data() function.  
// the using a function, we determine the text to display, and same
// goes to style. 
selected7.selectAll('div')
        .data(num)
        .text(function (d, i) {
            // Return value is used to set the 'text'.
            return i+1 + '. cont:' + d;
        })
        .style('color', function(d, i) {
            // Conditional function to display text a red or blue
            if (d >= 50 && d <= 100) {
                return 'red';
            } else {
                return 'blue';
            }
        });

// Exercise 8
// Given data
const data8 = ['a', 4, 1, 'b', 6, 2, 8, 9, 'z'];
// Predefine selected Element.
const selected8 = d3.select('.container8').select('.answercenter')
                    .selectAll('span');
// Chaining commands: data() > enter() > append() > text() > style()
selected8.data(data8).enter()
        .append('span')
        .text(function (d, i) {
            return d
        })
        .style('color', 'white')
        .style('background-color', function (d, i) {
            if (typeof d === 'string') {
                return 'blue'
            } else {
                return 'green'
            }
        });

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::        
// ::::::::: Starting from Exercise 9, new divs are created using d3.js ::::::::::
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/**
 * Function takes params taskid and height, and creates new divs and sections
 * systematically for each exercise.
 * @param {*} taskid The id of Exercise
 * @param {*} height Height of Div for said Exercise
 */
const createdivs = function(taskid, height) {
    d3.select('body').append('div')
        .attr('class', 'container' + taskid)
        .attr('height', height + 'px')
        .attr('position', 'relative')
        .attr('display', 'flex');
    d3.select('.container' + taskid).append('div')
        .attr('class', 'answercenter')
        .append('p').append('strong')
        .text('Exercise ' + taskid + ':');
};

// Exercise 9
createdivs(9, 200);
// Importing the given titanic data.
let data9 = 'https://raw.githubusercontent.com/dsindy/kaggle-titanic/master/data/test.csv';
d3.csv(data9, function(d) {
    let selection9 = d3.select('container9').select('answercenter')
    let countObj = {}
    data.forEach(function(d) {
        var name = d.name
        if (name.substring(0, 2) === 'Mr') {
            if (countObj[male] === undefined) {
                countObj[male] = 1
            } else {
                countObj[male] = countObj[male] + 1
            }
        } else if (name.substring(0, 3) === 'Mrs') {
            if (countObj[female] === undefined) {
                countObj[female] = 1
            } else {
                countObj[female] = countObj[female] + 1
            }
        } else {
            if (countObj[others] === undefined) {
                countObj[others] = 1
            } else {
                countObj[others] = countObj[others] + 1
            }
        }
    });
    selection9.append('p')
        .text(countObj.toString())
});