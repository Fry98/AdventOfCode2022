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
  console.log(sums[0]); // Part 1
  console.log(sums[0] + sums[1] + sums[2]); // Part 2
});
