---
title: "BOJ-2581"
date: "2022-07-15T13:53:32.957Z"
description: 소수(https://www.acmicpc.net/problem/2581)
tags:
  - 백준
  - 코딩테스트
---

## 포인트

- N, M이 주어질 때 1은 소수가 아니므로 1이 주어지는 경우도 예외처리가 필요함.

```js
const fs = require("fs")
const [start, end] = fs.readFileSync("./test").toString().trim().split("\n")

const startNum = Number(start)
const endNum = Number(end)

const decimal = []

const peekDecimal = n => {
  for (let i = 2; i <= parseInt(n / 2); i++) {
    if (n % i === 0) return false
  }

  if (n !== 1) decimal.push(n)
  return true
}

for (let i = startNum; i <= endNum; i++) {
  peekDecimal(i)
}

if (decimal.length > 0) {
  console.log(decimal.reduce((a, b) => a + b, 0))
  console.log(decimal[0])
} else {
  console.log(-1)
}
```
