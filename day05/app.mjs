import fs from 'fs';
import process from 'process';

const data = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(x => x);
const stacks = [];
let row = 0, columnIdx = 0;

outer:
for (;; row++) {
  for (let i = 1; data[row][i]; i += 4, columnIdx++) {
    const code = data[row][i].charCodeAt(0);
    if (code > 48 && code < 64) break outer;

    if (stacks[columnIdx] === undefined) stacks[columnIdx] = [];
    if (data[row][i] !== ' ') stacks[columnIdx].unshift(data[row][i]);
  }

  columnIdx = 0;
}

for (let i = row + 1; i < data.length; i++) {
  const words = data[i].split(' ');
  const count = Number(words[1]);
  const src = Number(words[3]) - 1;
  const dest = Number(words[5]) - 1;

  // Part 1:
  /** stacks[dest].push(...stacks[src].slice(-count).reverse()); */

  // Part 2:
  stacks[dest].push(...stacks[src].slice(-count));

  stacks[src] = stacks[src].slice(0, -count);
}

for (const stack of stacks) {
  process.stdout.write(stack.at(-1));
}

console.log();
