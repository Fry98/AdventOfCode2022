import fs from 'fs';

const data = fs.readFileSync('input.txt', 'utf8').split('\n').filter(x => x);
const knots = [...Array(10)].map(() => [0, 0]);
const p1Pos = new Set(), p2Pos = new Set();

for (const line of data) {
  let [dir, steps] = line.split(' ');
  steps = Number(steps);

  switch (dir) {
    case 'R':
      move(steps, 1, 0);
      break;
    case 'L':
      move(steps, -1, 0);
      break;
    case 'U':
      move(steps, 0, -1);
      break;
    case 'D':
      move(steps, 0, 1);
      break;
  }
}

console.log('Part 1:', p1Pos.size);
console.log('Part 2:', p2Pos.size);

function move(steps, deltaX, deltaY) {
  for (let i = 0; i < steps; i++) {
    knots[0][0] += deltaX;
    knots[0][1] += deltaY;

    for (let j = 1; j < knots.length; j++)
      reconcile(knots[j - 1], knots[j]);

    let [tailX, tailY] = knots[1];
    p1Pos.add(`${tailX};${tailY}`);

    [tailX, tailY] = knots.at(-1);
    p2Pos.add(`${tailX};${tailY}`);
  }
}

function reconcile(head, tail) {
  const deltaX = head[0] - tail[0], deltaY = head[1] - tail[1];
  if (Math.abs(deltaX) < 2 && Math.abs(deltaY) < 2) return;

  const stepX = deltaX / Math.abs(deltaX || 1);
  const stepY = deltaY / Math.abs(deltaY || 1);
  tail[0] += stepX;
  tail[1] += stepY;
}
