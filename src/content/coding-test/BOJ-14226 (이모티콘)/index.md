---
title: "BOJ-14226 (이모티콘)"
published: 2022-07-29
description: <설명>
category: 코테
draft: false
tags:
  - 코딩테스트
  - 태그2
---

```
const fs = require("fs")
const S = Number(fs.readFileSync("./test").toString().trim())

const queue = [{ screen: 1, clip: 0, t: 0 }]
const visits = Array.from({ length: 1001 }, () => Array(1001).fill(0))

function copy(q) {
  if (!visits[q.screen][q.screen]) {
    visits[q.screen][q.screen] = 1
    return { screen: q.screen, clip: q.screen, t: q.t + 1 }
  }

  return null
}

function paste(q) {
  if (q.clip > 0 && q.screen + q.clip <= 1000) {
    if (
      !visits[q.screen + q.clip][q.clip] &&
      q.clip > 0 &&
      q.screen + q.clip <= 1000
    ) {
      visits[q.screen + q.clip][q.clip] = 1
      return { screen: q.screen + q.clip, clip: q.clip, t: q.t + 1 }
    }
  }

  return q
}

function delEmoji(q) {
  if (q.screen - 1 >= 0 && !visits[q.screen - 1][q.clip] && q.screen > 0) {
    visits[q.screen - 1][q.clip] = 1
    return { screen: q.screen - 1, clip: q.clip, t: q.t + 1 }
  }
}

const calc = [copy, paste, delEmoji]

let min = Infinity

function bfs() {
  while (queue.length) {
    const q = queue.shift()

    if (q.screen === S) {
      min = Math.min(min, q.t)
    }

    for (const fn of calc) {
      const nextQ = fn(q)

      if (!nextQ) continue
      if (nextQ.screen < 0 || nextQ.screen >= 1000) continue

      queue.push(nextQ)
    }
  }
}

console.log(bfs())
```
