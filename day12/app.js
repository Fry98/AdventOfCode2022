import { defineSolution } from 'aoc-kit';

export default defineSolution((input, solve, { isPart1 }) => {
  let start = null, end = null, min_path = Number.MAX_VALUE;
  const heightGrid = [...Array(input[0].length)].map(() => []);
  const bestPathGrid = [...Array(input[0].length)].map(() => []);
  const usedGrid = [...Array(input[0].length)].map(() => []);

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      heightGrid[j][i] = input[i][j].charCodeAt(0) - 97;
      bestPathGrid[j][i] = Number.MAX_VALUE;
      usedGrid[j][i] = false;

      if (heightGrid[j][i] === -14) {
        heightGrid[j][i] = 0;
        end = [j, i];
      } else if (heightGrid[j][i] === -28) {
        heightGrid[j][i] = 25;
        start = [j, i];
      }
    }
  }

  dfs(start[0], start[1], 0);
  solve(min_path);

  function dfs(coordX, coordY, dist) {
    bestPathGrid[coordX][coordY] = dist;

    if (
      (isPart1 && coordX === end[0] && coordY === end[1]) ||
      (!isPart1 && heightGrid[coordX][coordY] === 0)
    ) {
      min_path = Math.min(dist, min_path);
      return;
    }

    usedGrid[coordX][coordY] = true;
    nextStep(-1, 0);
    nextStep(1, 0);
    nextStep(0, -1);
    nextStep(0, 1);
    usedGrid[coordX][coordY] = false;

    function nextStep(deltaX, deltaY) {
      const newX = coordX + deltaX;
      const newY = coordY + deltaY;

      if (newX < 0 || newX >= input[0].length || newY < 0 || newY >= input.length) return;
      if (heightGrid[coordX][coordY] - heightGrid[newX][newY] > 1) return;
      if (usedGrid[newX][newY]) return;
      if (dist + 1 >= bestPathGrid[newX][newY]) return;

      dfs(newX, newY, dist + 1);
    }
  }
}, { mode: 'lines', day: 12 });
