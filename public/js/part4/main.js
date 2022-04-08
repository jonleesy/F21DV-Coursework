import { setupContent } from './content.js';
import { setup } from './functions.js';
import { setupLine } from './line.js';
import { setupMap } from './map.js';
import { setupScatter } from './scatter.js';
import { setupSlider } from './slider.js';

// set up the divs systematically
setup();

// set up the map
await setupMap();

// set up the plots
await setupScatter('top-right-container');
await setupLine();

// setup slider
await setupSlider();

// setup content
setupContent();