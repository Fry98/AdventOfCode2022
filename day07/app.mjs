import fs from 'fs';

const data = fs.readFileSync('input.txt', 'utf8').split('\n').filter(x => x);
const root = { children: {}, parent: null, size: 0 };
let curr = null, idx = 0, total = 0;

while (idx < data.length) {
  const [_, cmd, arg] = data[idx++].split(' ');
  switch (cmd) {
    case 'cd':
      switch (arg) {
        case '/':
          curr = root;
          break;
        case '..':
          curr = curr.parent;
          break;
        default:
          cd_child(arg);
      }
      break;
    case 'ls':
      ls();
      break;
  }
}

update_size(root);
dfs(root);
console.log('Part 1:', total);

const required = -40_000_000 + root.size;
let res = Number.MAX_VALUE;
dfs2(root);
console.log('Part 2:', res);

function dfs2(node) {
  if (node.size >= required && node.size < res)
    res = node.size;

  for (const child of Object.keys(node.children)) {
    dfs2(node.children[child]);
  }
}

function dfs(node) {
  if (node.size <= 100_000) {
    total += node.size;
  }

  for (const child of Object.keys(node.children)) {
    dfs(node.children[child]);
  }
}

function update_size(node) {
  for (const child of Object.keys(node.children)) {
    node.size += update_size(node.children[child]);
  }

  return node.size;
}

function cd_child(arg) {
  if (!curr.children[arg]) {
    curr.children[arg] = {
      children: {},
      parent: curr,
      size: 0
    };
  }

  curr = curr.children[arg];
}

function ls() {
  while (idx < data.length) {
    const [p1] = data[idx++].split(' ');
    if (p1 === '$') {
      idx--;
      break;
    }

    if (p1 === 'dir') continue;
    curr.size += Number(p1);
  }
}
