---
title: "BOJ-2178"
published: 2022-07-26
description: <설명>
category: 코테
draft: false
tags:
  - 코딩테스트
  - 태그2
---

## 포인트

- bfs 문제
- 이전 노드에서 1씩 추가해서 다음 노드에 넣어주는게 핵심. 결국 해당 노드에 있는 숫자가 그 노드에 방문하기 위한 비용임.

```js
const fs = require("fs");
const [info, ...miro] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const miroArr = miro.map((m) => m.split("").map((v) => Number(v)));
const [n, m] = info.split(" ").map((v) => Number(v));

const check = Array.from({ length: n }, () => Array(m).fill(0));

const bfs = (startX, startY) => {
  const queue = [];

  const move = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  queue.push([startX, startY]);
  check[startX][startY] = 1;

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < move.length; i++) {
      const nextX = x + move[i][0];
      const nextY = y + move[i][1];

      if (
        0 <= nextX &&
        nextX < n &&
        0 <= nextY &&
        nextY < m &&
        miroArr[nextX][nextY] === 1 &&
        check[nextX][nextY] === 0
      ) {
        check[nextX][nextY] += check[x][y] + 1;
        queue.push([nextX, nextY]);
      }
    }
  }
};

bfs(0, 0);

console.log(check[n - 1][m - 1]);
```
