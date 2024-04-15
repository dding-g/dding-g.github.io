---
title: "[BOJ]1697 숨바꼭질"
published: 2022-07-12
description: "[문제링크](https://www.acmicpc.net/problem/1697)"
category: 코테
draft: false
tags:
  - "코딩테스트"
  - "백준"
---

```js
// https://www.acmicpc.net/problem/1697
const fs = require("fs")
const input = fs.readFileSync("./testFile").toString().trim().split(" ")

const x = Number(input[0])
const target = Number(input[1])

const way = [v => v * 2, v => v + 1, v => v - 1]

const queue = []

const bfs = (point, cnt) => {
  if (point === target) {
    return cnt
  } else if (point > target) {
    return -1
  }

  queue.push(way[0](point), way[1](point), way[2](point))

  bfs(queue.shift(), cnt + 1)
}

bfs(x, 0)
```
