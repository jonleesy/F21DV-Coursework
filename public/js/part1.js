// js script for part 1

// Exercise 1
// Adding a span after div with class: 'task1'.
// d3 select then is stored in const task1.
let task1 = d3.select('.task1').append('span');
// Then setting the text to show version of d3
task1.text(d3.version);

// Exercise 2
// Out of the 3 divs, first and last was classed as 'task2'.
// Selecting those that were named 'task2' and changing the 
// font colour to blue
d3.selectAll('.task2').style('color', 'blue');

// Exercise 3
// Loop for 10 divs, where each has 'task3' classed div as
// parent div.
for (let i=1; i < 11; i++) {
    d3.select('.task3') // Select 'task3'.
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
}

// Exercise 4
// d3 to select 'task4button' and add an event listener that listens
// for the click event.
d3.select('#task4button').on('click', function() {
    // Conditioned d3 modificaton of the first div.
    // If the first div has its original value, modify and
    // replace value with 'start' and colour purple.
    // Else, if its purple with value 'start', modify and
    // replace value with original '1'
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
// Practice on chained commands. Select 'task5' div, then add another div
// that says 'Hello World!' and style it in green text.
d3.select('.task5').append('div').text('Hello World!')
    .style('color','green');

// Exercise 6
// Add 'color' in otherdata
let otherdata = [{name:'test', val:1, color:'red'},
                {name:'other', val:2, color:'green'}, 
                {name:'b',     val:3, color:'blue'}];
// Select 'container6' > 'answercenter' > all its child divs,
// then use the data method to instantiate 'otherdata' as the data for d3, then using the
// .text() function, add a nested function that returns the wanted name + colour 
// for text of said div. Then, using the .style() funciton, we style the text to its respective colour
d3.select('.container6').select('.answercenter').selectAll('div')
    .data(otherdata)
    .text(function (d, i) {
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
}
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
            return d;
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
        .style('height', height + 'px')
        .attr('position', 'relative')
        .attr('display', 'flex');
    d3.select('.container' + taskid).append('div')
        .attr('class', 'answercenter')
        .append('p').append('strong')
        .text('Exercise ' + taskid + ':');
};

// Exercise 9
// Initialising Divs for task 9.
createdivs(9, 265);
// Importing the given titanic data.
let data9 = 'https://raw.githubusercontent.com/dsindy/kaggle-titanic/master/data/test.csv';
// Using a predefined variable for d3 in queston 9.
let selection9 = d3.select('.container9').select('.answercenter');
d3.csv(data9).then(function(data) {
    // Local Variables for <p> print statements.
    let mr = 0;
    let mrs = 0;
    let other = 0;
    let male = 0;
    let female = 0;
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
    });
    // Using results to append paragrpahs for this div.
    selection9.append('p').text('A total of ' + mr.toString() + ' passengers identifies as Mr.');
    selection9.append('p').text('A total of ' + mrs.toString() + ' passengers identifies as Mrs.');
    selection9.append('p').text('A total of ' + other.toString() + ' passengers identifies as neither.');
    selection9.append('p').text('there are ' + male + ' male and ' + female + ' female passengers.');
});

// Exercise 10
// Initialising divs for task 10.
createdivs(10, 260);
// Reading in the data
let data10 = 'https://raw.githubusercontent.com/akmand/datasets/master/heart_failure.csv';
// Storing data into the range-variable.
d3.csv(data10).then(function(data) {
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
    // Select the correct divs, then select all <p> (which are not present), 
    // and by using enter(), we create new <p>s that were not present. Once
    // done, using the .text() and function (d,i) nested function, we obtain
    // the right text to display for all 
    d3.select('.container10').select('.answercenter').selectAll('p')
        .data([0, young, mid, old, veryold]).enter().append('p')
        .text(function(d, i) {
            let msg = d.toString() + ' people with age ';
            if (i == 1) {
                msg = msg + '1-31';
            } else if (i == 2) {
                msg = msg + '31-40';
            } else if (i == 3) {
                msg = msg + '41-60';
            } else if (i == 4) {
                msg = msg + '61-100';
            }
            msg = msg + ' have heart disease.';
            return msg;
        });
});

// Exercise 11
// Systematically creating divs for new exercise
createdivs(11, 280)
// Generalised d3 svg div selection.
let svg11 = d3.select('.container11').select('.answercenter');
// Data Points for square lines.
let data11 = [{x:[0,200],   y:[0,0],     'color':'red'},
              {x:[200,200], y:[0,200],   'color':'blue'},
              {x:[200,0],   y:[200,200], 'color':'purple'},
              {x:[0,0],     y:[200,0],   'color':'green'}];
// Create SVG element.
svg11.append('svg')
    .attr('width', 200)
    .attr('height', 200)
    .style('border', '6px solid yellow')
// Create line element inside SVG, using data points from data11.
for (let key in data11) {
    svg11.select('svg').append('line')
        .attr('x1', data11[key]['x'][0])
        .attr('x2', data11[key]['x'][1])
        .attr('y1', data11[key]['y'][0])
        .attr('y2', data11[key]['y'][1])
        .attr('stroke-width', 12)
        .attr('stroke', data11[key]['color'])
}

// Exercise 12
// Systematic initialisation.
createdivs(12, 280)
// Read Csv
const data12 = d3.csv('../data/part1/task12.csv');
// Selected div
let selected12 = d3.select('.container12').select('.answercenter')
// Appending an SVG.
selected12
    .append('svg') 
        .attr('width',  200) 
        .attr('height', 200) 
        .style('border', '1px solid green')
    .append('circle')
        .attr('cx', 100)
        .attr('cy', 50)
        .attr('r', 50);
// console.log(data12)
// , d => `${d.name}${d.width}${d.height}${d.x}${d.y}${d.cx}${d.cy}${d.r}${d.rx}${d.ry}${d.stroke}${d.text}${d.fill}`
selected12.select('svg').data(data12)
    .selectAll(function(d) {
        return d.name
    })
    .join(
        enter => {
            console.log(d.name)
            enter.append(d.name)
                .attr('cx', d.cx)
                .attr('cy', d.cy)
                .attr('fill', d.fill)
                .attr('height', d.height)
                .attr('r', d.r)
                .attr('rx', d.rx)
                .attr('ry', d.ry)
                .attr('stroke', d.stroke)
                .attr('width', d.width)
                .attr('x', d.x)
                .attr('y', d.y)
        },
        update => update,
        exit => exit.remove()
    )
    .text(data12.text)
// selected12 = selected12.select('svg');
// // https://observablehq.com/@thetylerwolf/day-18-join-enter-update-exit
// d3.csv(data12).then(function(d) {
//     for (let key in d) {
//         const keyArr = [];
//         const valArr = [];
//         for (let key2 in d[key]) {
//             if (d[key][key2] !== '') {
//                 keyArr.push(key2);
//                 valArr.push(d[key][key2]);
//             }
//         }
//         selected12.select('svg').selectAll(valArr[0])
//             // .data({key:keyArr, val:valArr})
//             .join(
//                 enter => {
//                     enter.append(valArr[0])
//                         .attr(keyArr[1], valArr[1])
//                         .attr(keyArr[2], valArr[2])
//                         .attr(keyArr[3], valArr[3])
//                         .attr(keyArr[4], valArr[4])
//                         .attr(keyArr[5], valArr[5])
//                     // let tempEnter = enter.append(valArr[0])
//                     // for (let i = 1; i < keyArr.length; i++) {
//                     //     console.log(keyArr[i], valArr[i])
//                     //     tempEnter = tempEnter.attr(keyArr[i], valArr[i])
//                     // }
//                     // .data({key:keyArr, val:valArr})
//                     // .attrs(function(dt) {
//                     //     let msg = '';
//                     //     for (let i = 1; i < dt['key'].length; i++) {
//                     //         msg = msg + dt['key'][i] + ':' + dt['val'][i] + ',';
//                     //     }
//                     //     return msg.substring(0, msg.length-1)
//                     // })
//                 },
//                 update => update
//             )
//             .exit()
//             .remove()
//     }
//     // let tempSelected = selected12.selectAll(d[key]['name']) 
// })
// d3.csv(data12).then(function(d) {
//     // Iterate through all rows, each row holds attr for their respective shapes.
//     for (let key in d) {
//         // Selecting the svg element each time a new csv row is selected, 
//         // and appending a new svg item based on the 'name' given.
//         let tempSelected = selected12.select('svg').append(d[key]['name'])
//         // Iterate through the columns of each row.
//         for (let key2 in d[key]) {
//             // Checking to make sure if its not a 'name', then update each attribute. 
//             // Checks are also done to make sure that no attribute update is done,
//             // if said column is empty (this item has no use of such attribute).
//             if (key2 !== 'name' && d[key][key2] !== '' && key2 !== 'text' && key !== 'columns') {
//                 // Using [key][key2]-value pair to update the attribute.
//                 try {
//                     tempSelected = tempSelected.attr(key2, d[key][key2]);
//                 } catch(err) {
//                     console.log(key, key2, d[key][key2])
//                     console.log(err.message);
//                 }
//             // Else-if is used for 'text' since text is updated using 'text' field,
//             // and not the 'attr' field.
//             } else if (key2 === 'text') {
//                 try {
//                     tempSelected = tempSelected.text(d[key][key2])
//                 } catch(err) {
//                     console.log(key, key2, d[key][key2])
//                     console.log(err.message);
//                 }
//             }
//         }
//     }
// })