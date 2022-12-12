import { defineSolution } from 'aoc-kit';

export default defineSolution((input, solve, config) => {
  const size = Math.ceil(input.length / 7);
  const monkeys = [...Array(size)].map(() => ({}));
  const isPart1 = config.part === 1;
  let mod = 1;

  let i = 0, id = 0;
  while (i < input.length) {
    monkeys[id].items = input[++i].substring(17).split(', ').map(x => Number(x));
    monkeys[id].op = input[++i].split(' ')[6];
    monkeys[id].delta = Number(input[i].split(' ')[7]);
    monkeys[id].test = Number(input[++i].split(' ')[5]);
    mod *= monkeys[id].test;
    monkeys[id].ifTrue = Number(input[++i].split(' ')[9]);
    monkeys[id].ifFalse = Number(input[++i].split(' ')[9]);
    monkeys[id++].inspects = 0;
    i += 2;
  }

  const rounds = isPart1 ? 20 : 10000;
  for (let i = 0; i < rounds; i++) {
    for (id = 0; id < size; id++) {
      const monkey = monkeys[id];
      while (monkey.items.length > 0) {
        let worry = monkey.items[0];
        const delta = Number.isNaN(monkey.delta) ? worry : monkey.delta;
        monkey.inspects++;

        switch (monkey.op) {
          case '+':
            worry += delta;
            break;
          case '*':
            worry *= delta;
            break;
        }

        if (isPart1) worry = Math.floor(worry / 3);
        worry %= mod;
        monkey.items.shift();

        if (worry % monkey.test === 0) {
          monkeys[monkey.ifTrue].items.push(worry);
        } else {
          monkeys[monkey.ifFalse].items.push(worry);
        }
      }
    }
  }

  const sorted = monkeys.map(x => x.inspects).sort((a, b) => b - a);
  solve(sorted[0] * sorted[1]);
}, { lines: true, day: 11 });
