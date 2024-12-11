---
title: BOJ-2460
published: 2022-07-13
description: 지능형 기차 2
category: 코테
draft: false
tags:
  - 백준
  - 코딩테스트
---

```js
// https://www.acmicpc.net/problem/2460

const fs = require("fs")
const stations = fs.readFileSync("/dev/stdin").toString().trim().split("\n")

let cnt = 0
let maxCnt = 0

stations.forEach(station => {
  const [out, on] = station.split(" ")

  cnt += on - out

  if (cnt > maxCnt) {
    maxCnt = cnt
  }
})

console.log(maxCnt)
```
