---
title: BOJ-2693
published: 2022-07-14T00:12:03.284Z
description: N번쨰 큰 수 (https://www.acmicpc.net/problem/2693)
category: 코테
draft: false
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
