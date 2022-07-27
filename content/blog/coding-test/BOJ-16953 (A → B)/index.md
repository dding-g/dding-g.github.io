---
title: "BOJ-16953 (A → B)"
date: "2022-07-27T15:02:18.834Z"
description: <설명>
tags:
  - 코딩테스트
  - 백준
---

## 포인트

- 최소값을 구하는 문제 이지만 dfs로 풀기도 가능

### DFS 풀이

```js
const fs = require("fs")
const [A, B] = fs
  .readFileSync("./test")
  .toString()
  .trim()
  .split(" ")
  .map(v => Number(v))

const calc = [v => v * 2, v => Number(v + "1")]

let min = Infinity

const dfs = (val, cnt) => {
  if (val > B) return
  if (val === B) {
    min = Math.min(min, cnt)
    return
  }

  calc.forEach(fn => {
    dfs(fn(val), cnt + 1)
  })
}

dfs(A, 1)

console.log(min === Infinity ? -1 : min)
```

### BFS 풀이

```js
const fs = require("fs")
const [A, B] = fs
  .readFileSync("./test")
  .toString()
  .trim()
  .split(" ")
  .map(v => Number(v))

const calc = [v => v * 2, v => Number(v + "1")]

const queue = []

let min = Infinity

const bfs = startVal => {
  queue.push({ v: startVal, c: 1 })

  while (queue.length) {
    const { v, c } = queue.shift()

    if (v > B) {
      continue
    }

    if (v === B) {
      min = Math.min(c, min)
    }

    if (v < B) {
      calc.forEach(fn => {
        queue.push({ v: fn(v), c: c + 1 })
      })
    }
  }
}

bfs(A)

console.log(min === Infinity ? -1 : min)
```
