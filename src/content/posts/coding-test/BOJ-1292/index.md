---
title: "BOJ-1292"
published: 2022-07-15T13:13:55.001Z
description: 쉽게 푸는 문제 https://www.acmicpc.net/problem/1292
category: 코테
draft: false
tags:
  - 백준
  - 코딩테스트
---

## 포인트

- Array.slice 는 start index ~ end - 1 index 까지 잘라 새로운 배열을 만든다.

```js
const fs = require("fs")
const [start, end] = fs.readFileSync("/dev/stdin").toString().trim().split(" ")

const arr = []
let currValue = 1

while (arr.length <= end) {
  for (let i = 0; i < currValue; i++) {
    arr.push(currValue)
  }
  currValue++
}

console.log(arr.slice(start - 1, end).reduce((a, b) => a + b, 0))
```
