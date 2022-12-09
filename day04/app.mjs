import fs from 'fs';

let p1Total = 0, p2Total = 0;
const data = fs.readFileSync('input.txt', 'utf8').split('\n').filter(x => x);

for (const line of data) {
  const [r1Start, r1End, r2Start, r2End] = line.split(',')
    .flatMap(x => x.split('-').map(x => Number(x)));

  // Part 1:
  if (
    (r1Start >= r2Start && r1End <= r2End) ||
    (r2Start >= r1Start && r2End <= r1End)
  ) p1Total++;

  // Part 2:
  if (
    (r1Start >= r2Start && r1Start <= r2End) ||
    (r2Start >= r1Start && r2Start <= r1End)
  ) p2Total++;
}

console.log('Part 1:', p1Total);
console.log('Part 2:', p2Total);
