---
title: BOJ-1978
date: "2022-07-14T00:04:54.000Z"
description: 소수 찾기 (https://www.acmicpc.net/problem/1978)
tags:
  - 백준
  - 코딩테스트
---

```js
const fs = require("fs")
const [n, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n")

console.log(
  arr.split(" ").filter(v => {
    const num = parseInt(v)

    for (let i = 2; i < num / 2; i++) {
      if (num % i === 0) return false
    }

    if (num === 1) return false
    return true
  }).length
)
```
