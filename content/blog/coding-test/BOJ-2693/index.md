---
title: BOJ-2693
date: Thu Jul 14 2022 00:01:40 GMT+0900 (대한민국 표준시)
description: N번쨰 큰 수 (https://www.acmicpc.net/problem/2693)
tags:
  - 백준
  - 코딩테스트
---

```js
const fs = require("fs")
const [num, ...arr] = fs.readFileSync("./test").toString().trim().split("\n")

for (let i = 0; i < num; i++) {
  const temp = arr[i].split(" ").sort((a, b) => b - a)
  console.log(temp[2])
}
```
