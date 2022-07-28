---
title: "BOJ-13549 (숨바꼭질3)"
date: "2022-07-28T14:53:59.526Z"
description: <설명>
tags:
  - 코딩테스트
  - 태그2
---

## 포인트

- 왜 아래는 되고
  ```js
    if (next < 0 || next > 100000) continue
    if (visits[next]) continue
  ```
  아래는 안되는지 모르겠다.
  ```js
    if (next >= 0 && next <= 100000 && visits[next] === 0) {
  ```

```js
const fs = require("fs")
const [n, k] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(v => Number(v))

const move = [v => v * 2, v => v - 1, v => v + 1]

const queue = []

const visits = Array(100000).fill(0)

function bfs(startVal) {
  queue.push({ v: startVal, t: 0 })
  visits[startVal] = 1

  while (queue.length) {
    const { v, t } = queue.shift()

    if (v === k) {
      return t
    }

    for (let i = 0; i < move.length; i++) {
      const next = move[i](v)
      if (next < 0 || next > 100000) continue
      if (visits[next]) continue

      visits[next] = 1

      if (i === 0) queue.unshift({ v: next, t })
      else queue.push({ v: next, t: t + 1 })
    }
  }
}

console.log(bfs(n))
```
