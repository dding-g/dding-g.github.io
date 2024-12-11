---
title: "BOJ-1038"
published: 2022-07-20
description: <설명>
category: 코테
draft: false
tags:
  - 코딩테스트
  - 백준
---

```
const fs = require("fs")
const n = fs.readFileSync("./test").toString().trim()

const answer = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const N = Number(n)

let cnt = 10

for (let i = 0; i < 1024; i++) {
  const str = cnt.toString()

  let prevStr = str[0]
  let isAnswer = false

  for (let j = 1; j < str.length; j++) {
    if (Number(prevStr) > Number(str[j])) {
      isAnswer = true
    } else {
      isAnswer = false
      break
    }

    prevStr = str[i]
  }

  if (isAnswer) {
    answer.push(cnt)
  }

  cnt++
}

if (N < 10 && answer.length === 10) {
  console.log(answer[N])
  process.exit(0)
} else if (answer.length === 10 || cnt >= 9876543210) {
  console.log(-1)
  process.exit(0)
}

console.log(answer[N])

```
