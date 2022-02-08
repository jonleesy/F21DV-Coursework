// Lab 2's Index Page Javascript Setup
import { createExercisesUrl, mergeTask, removeTask } from '../functions.js';

// Array of numbers [0, 1, 2, ..., 32] defining number of exercises
const data = Array.from(Array(33).keys());

// Create 32 exercises
createExercisesUrl(data)