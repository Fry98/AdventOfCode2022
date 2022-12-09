import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

const sums = [];
let acc = 0;
rl.on('line', (line) => {
  if (line.length) {
    acc += Number(line);
  } else {
    sums.push(acc);
    acc = 0;
  }
});

rl.on('close', () => {
  sums.sort((a, b) => b - a);
  console.log('Part 1:', sums[0]);
  console.log('Part 2:', sums[0] + sums[1] + sums[2]);
});
