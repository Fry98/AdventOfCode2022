import fs from 'fs';

const table = new Set();
const data = fs.readFileSync('input.txt', 'utf8').split('\n').filter(x => x);

let total = 0;
for (const line of data) {
  table.clear();
  const comp1 = line.substring(0, line.length / 2);
  const comp2 = line.substring(line.length / 2);

  for (const ch of comp1)
    table.add(ch);

  for (const ch of comp2) {
    if (table.has(ch)) {
      addToTotal(ch);
      break;
    }
  }
}

console.log(total);

/** @param {string} ch */
function addToTotal(ch) {
  const code = ch.charCodeAt(0);
  total += code > 96 ? code - 96 : code - 38;
}
