import { defineSolution } from 'aoc-kit';

const obstacles = new Set();
let maxY = 0;
let isPart1;

function isSolid(x, y) {
  if (!isPart1 && y >= maxY + 2) return true;
  return obstacles.has(`${x};${y}`);
}

export default defineSolution((input, solve, config) => {
  isPart1 = config.isPart1;

  for (const line of input) {
    const coords = line.split(' -> ').map(x => x.split(',').map(x => Number(x)));
    maxY = Math.max(maxY, ...coords.map(x => x[1]));

    for (let i = 0; i < coords.length - 1; i++) {
      let c1 = coords[i], c2 = coords[i + 1];

      if (c1[1] == c2[1]) {
        if (c1[0] > c2[0]) [c1, c2] = [c2, c1];
        for (let x = c1[0]; x <= c2[0]; x++)
          obstacles.add(`${x};${c1[1]}`);
      } else {
        if (c1[1] > c2[1]) [c1, c2] = [c2, c1];
        for (let y = c1[1]; y <= c2[1]; y++)
          obstacles.add(`${c1[0]};${y}`);
      }
    }
  }

  let unit = 0;

  outer:
  for (unit = 0;; unit++) {
    let sandX = 500, sandY = 0;

    while (true) {
      if (!isSolid(sandX, sandY + 1)) {
        sandY++;
      } else if (!isSolid(sandX - 1, sandY + 1)) {
        sandX--, sandY++;
      } else if (!isSolid(sandX + 1, sandY + 1)) {
        sandX++, sandY++;
      } else {
        if (!isPart1 && sandX === 500 && sandY === 0)
          break outer;

        obstacles.add(`${sandX};${sandY}`);
        break;
      }

      if (isPart1 && sandY > maxY)
        break outer;
    }
  }

  solve(unit + 1 - isPart1);
}, { mode: 'lines', day: 14 });
