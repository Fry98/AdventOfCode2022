import fs from 'fs';

const lines = fs.readFileSync('input.txt', 'utf8').split('\n').filter(x => x);
let total = 0;

// Part 1:
/* for (const line of lines) {
  let [p1, p2] = line.split(' ');
  p1 = p1.charCodeAt(0) - 64;
  p2 = p2.charCodeAt(0) - 87;

  total += p2;
  if (p2 === p1) {
    total += 3;
  } else if (
    (p1 === 1 && p2 === 2) ||
    (p1 === 2 && p2 === 3) ||
    (p1 === 3 && p2 === 1)
  ) total += 6;
} */

// Part 2:
for (const line of lines) {
  let [p1, p2] = line.split(' ');
  p1 = p1.charCodeAt(0) - 65;

  if (p2 === 'X') { // lose
    total += (p1 + 2) % 3 + 1;
  } else if (p2 === 'Y') { // draw
    total += 4 + p1;
  } else { // win
    total += 7 + ((p1 + 1) % 3);
  }
}

console.log(total);
