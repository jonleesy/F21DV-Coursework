// js script for part 1 Exercise:
const ex = 6;

// Create Div Systematically using a genral function.
import {createDiv} from './functions.js';
createDiv(ex);

// Data for <div>s' color.>
const data = [{name:'test', val:1, color:'red'},
             {name:'other', val:2, color:'green'}, 
             {name:'b',     val:3, color:'blue'}];

// Text + style the <div>s.
// Join - Enter was used to create new <div>s.
d3.select('.answerCenter')
    .selectAll('div')
    .data(data)
    .join(enter => enter.append('div'))
    .text((d, i) => i+1 + '. cont: ' + d.name + '; color: ' + d.color)
    .style('color', (d, _) => d.color);