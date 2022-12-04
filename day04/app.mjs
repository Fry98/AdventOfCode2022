import fs from 'fs';

let total = 0;
const data = fs.readFileSync('input.txt', 'utf8').split('\n').filter(x => x);

for (const line of data) {
  const [r1Start, r1End, r2Start, r2End] = line.split(',')
    .flatMap(x => x.split('-').map(x => Number(x)));

  // Part 1:
  /* if (
    (r1Start >= r2Start && r1End <= r2End) ||
    (r2Start >= r1Start && r2End <= r1End)
  ) total++; */

  // Part 2:
  if (
    (r1Start >= r2Start && r1Start <= r2End) ||
    (r2Start >= r1Start && r2Start <= r1End)
  ) total++;
}

console.log(total);
