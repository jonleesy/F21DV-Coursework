import { setup } from './functions.js';
import { setupLine } from './line.js';
import { setupMap } from './map.js';
import { setupScatter } from './scatter.js';

// set up the divs systematically
setup();

// set up the map
await setupMap();

// set up the plots
await setupScatter();
await setupLine();