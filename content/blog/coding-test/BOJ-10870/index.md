---
title: BOJ-10870
date: "2022-07-13T22:55:54.000Z"
description: 피보나치 수 5(https://www.acmicpc.net/problem/10870)
tags:
  - 코딩테스트
  - 백준
---

```js
// https://www.acmicpc.net/problem/10870

const fs = require("fs")
const cnt = Number(fs.readFileSync("./test").toString())

const pibo = [0, 1]

for (let i = 2; i <= cnt; i += 1) {
  pibo.push(pibo[i - 2] + pibo[i - 1])
}

console.log(pibo[cnt])
```
