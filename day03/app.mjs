import fs from 'fs';

const data = fs.readFileSync('input.txt', 'utf8').split('\n').filter(x => x);
let total = 0;

// Part 1:
/* const table = new Set();
for (const line of data) {
  table.clear();
  const comp1 = line.substring(0, line.length / 2);
  const comp2 = line.substring(line.length / 2);

  for (const ch of comp1)
    table.add(ch);

  for (const ch of comp2) {
    if (table.has(ch)) {
      total += getValue(ch);
      break;
    }
  }
} */

// Part 2:
const table = new Map();
for (let i = 0; i < data.length; i += 3) {
  table.clear();
  const line1 = data[i];
  const line2 = data[i + 1];
  const line3 = data[i + 2];

  for (const ch of line1) table.set(ch, 1);
  for (const ch of line2) table.get(ch) && table.set(ch, 2);
  for (const ch of line3) {
    if (table.get(ch) === 2) {
      total += getValue(ch);
      break;
    }
  }
}

console.log(total);

/** @param {string} ch */
function getValue(ch) {
  const code = ch.charCodeAt(0);
  return code > 96 ? code - 96 : code - 38;
}
