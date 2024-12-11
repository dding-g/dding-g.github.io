---
title: "BOJ-3085"
published: 2022-07-19
description: 사탕 게임 (https://www.acmicpc.net/problem/3085)
category: 코테
draft: false
tags:
  - 코딩테스트
  - 백준
---

- 로직은 알겠으나 너무 구현에 시간이 많이 들 것 같아 중간에 패스

```js
const fs = require("fs");
const [num, ...arr] = fs.readFileSync("./test").toString().trim().split("\n");

let maxContinuous = 0;

const board = arr.map((v) => v.split(""));

// X, Y축 최대 연속 값 산출
for (let i = 0; i < num; i++) {
  const continuousX = new Set();
  const continuousY = new Set();

  for (let j = 0; i < num; j++) {
    continuousX.add(board[i][j]);
    continuousY.add(board[i][j]);
  }

  // 4개가 연속해도 set에는 1개가 들어가 있으니 모든 연속된 사탕 개수를 구하려면 +1 이 필요
  const temp = Math.max(num - continuousX.size(), num - continuousY.size());
  const continuous = temp === 1 ? 0 : temp + 1;

  if (continuous > maxContinuous) {
    maxContinuous = continuous;
  }
}

if (maxContinuous === num) {
  console.log(num);
  process.exit(0);
}

const search = (pickArr) => {
  const temp = new Set(pickArr);
  const continuous = num - temp.size() === 1 ? 0 : temp.size() + 1;

  if (continuous > maxContinuous) {
    maxContinuous = continuous;
  }
};

for (let i = 0; i < num; i++) {
  for (let j = 1; j < num; j++) {
    if (board[i][j - 1] !== board[i][j]) {
      const tempXArr = [...board[i]];
      tempXArr[j] = board[i][j - 1];
      tempXArr[j - 1] = board[i][j];

      // 바꾼 j, j-1 세로열까지 바꾸고 search 돌리기.

      search(tempXArr);
    }
  }
}

// 위 X열 서로 바꾼 것 처럼 Y열도 세로로 바꾸기. array X, Y 대칭
```
