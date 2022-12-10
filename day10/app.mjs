import process from 'process';
import fs from 'fs';

const TARGET_CYCLES = [20, 60, 100, 140, 180, 220];

let reg = 1;
const screen = [];
const target = Object.fromEntries(TARGET_CYCLES.map(x => [x, -1]))
const data = fs.readFileSync('input.txt', 'utf8').split('\n').filter(x => x)
  .flatMap(x => x.startsWith('addx') ? [0, Number(x.split(' ')[1])] : 0);

for (let i = 0; i < data.length; i++) {
  if (target[i + 1]) target[i + 1] = reg * (i + 1);
  reg += data[i];
}

const res = Object.entries(target).reduce((acc, x) => acc + x[1], 0);
console.log('Part 1:', res);

reg = 1;
for (let i = 0; i < data.length; i++) {
  const scrX = i % 40 + 1;
  screen.push(scrX >= reg && scrX <= reg + 2 ? '█' : ' ');
  reg += data[i];
}

console.log('Part 2:');
for (let y = 0; y < 6; y++) {
  for (let x = 0; x < 40; x++) {
    process.stdout.write(screen[x + y * 40]);
  }
  console.log();
}
