---
title: "BOJ-12851 (숨바꼭질 2)"
published: 2022-07-28
description: <설명>
category: 코테
draft: false
tags:
  - 코딩테스트
  - 백준
---

- 예제는 통과하는데, 제출하면 무한루프.
- 방문 노드만 체크해주면 해결할 듯. 이미 방문한 숫자에 대해서는 모든 경우의 수를 진행한 다음 이므로 다시 체크해줄 필요 X

```
const fs = require("fs")
const [n, k] = fs
  .readFileSync("./test")
  .toString()
  .trim()
  .split(" ")
  .map(v => Number(v))

const move = [v => v - 1, v => v + 1, v => v * 2]

const tick = []

const queue = []

function bfs(startVal) {
  move.forEach(fn => {
    queue.push({ v: fn(startVal), t: 1 })
  })

  while (queue.length) {
    const { v, t } = queue.shift()

    for (const fn of move) {
      const next = fn(v)

      if (next === k) {
        tick.push(t + 1)
      } else if (next > 0 && next - 1 <= k && next <= 100000) {
        if (tick.length > 0 && Math.min(...tick) < t) continue
        queue.push({ v: next, t: t + 1 })
      }
    }
  }
}

bfs(n)

const min = Math.min(...tick)
const minCount = tick.filter(t => t === min).length

console.log(min)
console.log(minCount)

```
