import { defineSolution } from 'aoc-kit';

function compare(p1, p2) {
  for (let i = 0;; i++) {
    if (i >= p1.length && i >= p2.length) {
      return 2;
    } else if (i >= p1.length) {
      return 0;
    } else if (i >= p2.length) {
      return 1;
    }

    if (typeof p1[i] === 'number' && typeof p2[i] === 'number') {
      if (p1[i] < p2[i]) return 0;
      if (p1[i] > p2[i]) return 1;
    } else {
      let wraped1 = p1[i], wraped2 = p2[i];
      if (typeof p1[i] === 'number') wraped1 = [p1[i]];
      if (typeof p2[i] === 'number') wraped2 = [p2[i]];

      let res = compare(wraped1, wraped2);
      if (res < 2) return res;
    }
  }
}

export default defineSolution((input, solve, config) => {
  const data = input.filter(x => x).map(x => ({ div: false, data: JSON.parse(x) }));
  if (config.part > 1) data.push({ div: true, data: [[2]] }, { div: true, data: [[6]] });
  let res = 0;

  if (config.part === 1) {
    for (let i = 0; i < data.length; i += 2) {
      if (!compare(data[i].data, data[i + 1].data))
        res += Math.floor(i / 2) + 1;
    }
  } else {
    for (let i = 0; i < data.length - 1; i++) {
      for (let j = 0; j < data.length - 1; j++) {
        if (compare(data[j].data, data[j + 1].data) == 1) {
          [data[j], data[j + 1]] = [data[j + 1], data[j]];
        }
      }
    }

    res = data.reduce((acc, x, i) => x.div ? acc * (i + 1) : acc, 1);
  }

  solve(res);
}, { mode: 'lines', day: 13 });
