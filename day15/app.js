import { defineSolution } from 'aoc-kit';

const TARGET_ROW = 2_000_000;

export default defineSolution((input, solve, { isPart1 }) => {
  let found = null;
  const covered = new Set();
  const data = input.map(line => line.split(' ')
    .filter((_, i) => [2, 3, 8, 9].includes(i))
    .map(x => parseInt(x.split('=')[1])));

  outer:
  for (const [sX, sY, bX, bY] of data) {
    const distX = Math.abs(sX - bX);
    const distY = Math.abs(sY - bY);
    const r = distX + distY;

    if (isPart1) {
      const rowDist = Math.abs(sY - TARGET_ROW);
      if (rowDist > r) continue;

      const rowLen = r - rowDist;
      for (let i = 0; i <= rowLen; i++) {
        covered.add(sX - i);
        covered.add(sX + i);
      }
    } else {
      for (let i = 0; i <= r + 1; i++) {
        const deltaX = r + 1 - i;
        const deltaY = i;

        checkCoord(sX + deltaX, sY + deltaY);
        if (deltaY > 0) checkCoord(sX + deltaX, sY - deltaY);

        if (deltaX > 0) {
          checkCoord(sX - deltaX, sY + deltaY);
          if (deltaY > 0) checkCoord(sX - deltaX, sY - deltaY);
        }

        if (found) break outer;
      }
    }
  }

  if (isPart1) {
    for (const [sX, sY, bX, bY] of data) {
      if (sY === TARGET_ROW) covered.delete(sX);
      if (bY === TARGET_ROW) covered.delete(bX);
    }

    solve(covered.size);
  } else {
    solve(found[0] * 4_000_000 + found[1]);
  }

  function checkCoord(x, y) {
    if (x < 0 || x > 4_000_000 || y < 0 || y > 4_000_000)
      return;

    for (const [sX, sY, bX, bY] of data) {
      const r = Math.abs(sX - bX) + Math.abs(sY - bY);
      const dist = Math.abs(sX - x) + Math.abs(sY - y);
      if (r >= dist) return;
    }

    found = [x, y];
  }
}, { mode: 'lines', day: 15 });
