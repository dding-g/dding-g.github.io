---
title: BOJ-2309
date: Wed Jul 13 2022 23:04:54 GMT+0900 (대한민국 표준시)
description: 일곱난쟁이
tags:
  - 백준
  - 코딩테스트
---

## 교훈

- forEach는 return으로 멈출 수 없습니다.

```js
const fs = require("fs")
const tall = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(v => parseInt(v))

const sumTall = tall.reduce((t, n) => t + n, 0)
const diffTall = sumTall - 100

let answer = []

for (let i = 0; i < tall.length; i += 1) {
  for (let j = i + 1; j < tall.length; j += 1) {
    const isDiff = tall[i] + tall[j] === diffTall

    if (isDiff) {
      answer = tall.filter(t => t !== tall[i] && t !== tall[j])
    }
  }
}

console.log(answer.sort((a, b) => a - b).join("\n"))
```
