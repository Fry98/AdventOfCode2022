import fs from 'fs';

const data = fs.readFileSync('input.txt', 'utf-8').split('\n');
const size = data[0].length;
const grid = [...Array(size)]
  .map(() => [...Array(size)]
  .map(() => ({
    height: 0,
    visible: false,
    left: 0, right: 0,
    up: 0, down: 0
  })));

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    grid[i][j].height = Number(data[j][i]);
  }
}

let count = 0;
for (let j = 0; j < size; j++) {
  search_lane(i => grid[i][j]);
  search_lane(i => grid[size - i - 1][j]);
  search_lane(i => grid[j][i]);
  search_lane(i => grid[j][size - i - 1]);
}

function search_lane(getCell) {
  let maxHeight = -1;
  for (let i = 0; i < size; i++) {
    const cell = getCell(i);

    if (cell.height > maxHeight) {
      maxHeight = cell.height;
      cell.visible || count++;
      cell.visible = true;
    }
  }
}

console.log('Part 1:', count);

let max_score = -1;
for (let i = 1; i < size - 1; i++) {
  for (let j = 1; j < size - 1; j++) {
    const cell = grid[i][j];
    for (let k = i + 1; k < size; k++) {
      cell.right++;
      if (cell.height <= grid[k][j].height)
        break;
    }

    for (let k = i - 1; k >= 0; k--) {
      cell.left++;
      if (cell.height <= grid[k][j].height)
        break;
    }

    for (let k = j + 1; k < size; k++) {
      cell.down++;
      if (cell.height <= grid[i][k].height)
        break;
    }

    for (let k = j - 1; k >= 0; k--) {
      cell.up++;
      if (cell.height <= grid[i][k].height)
        break;
    }

    const score = cell.down * cell.up * cell.left * cell.right;
    max_score = Math.max(score, max_score);
  }
}

console.log('Part 2:', max_score);
