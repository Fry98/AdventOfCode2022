import fs from 'fs';

// Part 1:
/** const SET_SIZE = 4; */

// Part 2:
const SET_SIZE = 14;

let data = fs.readFileSync('input.txt', 'utf8');
let counter = 0;

for (;; counter++) {
  const set = new Set(data.substring(0, SET_SIZE).split(''));
  if (set.size === SET_SIZE) {
    console.log(counter + SET_SIZE);
    break;
  }

  data = data.substring(1);
}
