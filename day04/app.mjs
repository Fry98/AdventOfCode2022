import fs from 'fs';

let total = 0;
const data = fs.readFileSync('input.txt', 'utf8').split('\n').filter(x => x);

for (const line of data) {
  const [r1, r2] = line.split(',');
  const [r1Start, r1End] = parseRange(r1);
  const [r2Start, r2End] = parseRange(r2);

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

function parseRange(inp) {
  const [start, end] = inp.split('-');
  return [Number(start), Number(end)];
}
