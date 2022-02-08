// js script for part 1 home page

import { createExercisesUrl, mergeTask, removeTask } from '../functions.js';

// Array of numbers [0, 1, 2, ..., 32] defining number of exercises
const data = Array.from(Array(33).keys());

// Create 32 exercises
createExercisesUrl(data)

// Merge Exercises
mergeTask(3, 4)
mergeTask(12, 13)
mergeTask(14, 15)
mergeTask(18, 19)
mergeTask(25, 27, ' to ', 'to')
mergeTask(30, 31)

// Remove Exercises
removeTask(22, "Exercise 22 was just to create a function for next two questions.")
removeTask(26, '')