import fs from 'fs';

let data = fs.readFileSync('input.txt', 'utf8');
console.log('Part 1:', findSequence(data, 4));
console.log('Part 2:', findSequence(data, 14));

function findSequence(data, length) {
  let copy = data, counter = 0;
  for (;; counter++) {
    const set = new Set(copy.substring(0, length).split(''));
    if (set.size === length) return counter + length;
    copy = copy.substring(1);
  }
}
