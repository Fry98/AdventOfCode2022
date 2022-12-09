import fs from 'fs';
import process from 'process';

const data = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(x => x);
let row = 0, columnIdx = 0;
const p1Stacks = [];
let p2Stacks = null;

outer:
for (;; row++) {
  for (let i = 1; data[row][i]; i += 4, columnIdx++) {
    const code = data[row][i].charCodeAt(0);
    if (code > 48 && code < 64) break outer;

    if (p1Stacks[columnIdx] === undefined) p1Stacks[columnIdx] = [];
    if (data[row][i] !== ' ') p1Stacks[columnIdx].unshift(data[row][i]);
  }

  columnIdx = 0;
}

p2Stacks = JSON.parse(JSON.stringify(p1Stacks));
for (let i = row + 1; i < data.length; i++) {
  const words = data[i].split(' ');
  const count = Number(words[1]);
  const src = Number(words[3]) - 1;
  const dest = Number(words[5]) - 1;

  // Part 1:
  p1Stacks[dest].push(...p1Stacks[src].slice(-count).reverse());

  // Part 2:
  p2Stacks[dest].push(...p2Stacks[src].slice(-count));

  p1Stacks[src] = p1Stacks[src].slice(0, -count);
  p2Stacks[src] = p2Stacks[src].slice(0, -count);
}

process.stdout.write('Part 1: ');
for (const stack of p1Stacks) process.stdout.write(stack.at(-1));
console.log();

process.stdout.write('Part 2: ');
for (const stack of p2Stacks) process.stdout.write(stack.at(-1));
console.log();
