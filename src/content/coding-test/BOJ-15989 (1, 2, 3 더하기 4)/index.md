---
title: "BOJ-15989 (1, 2, 3 더하기 4)"
published: 2022-08-01
description: https://www.acmicpc.net/problem/15989
category: 코테
draft: false
tags:
  - 코딩테스트
  - 백준
---

> 진행중...

- 포인트
  - dfs로 풀면 callstack이 버티지 못한다.
  - DP 문제라 점화식을 찾아야 함.

```
const fs = require("fs")
const [t, ...arr] = fs
  .readFileSync("./test")
  .toString()
  .trim()
  .split("\n")
  .map(v => Number(v))

const answer = Array(t).fill(1) // 모든게 1인 경우 하나는 기본.

for (let i = 0; i < t; i++) {
  const 몫 = parseInt(arr[i] / 2)
  const 나머지 = arr[i] % 2

  answer[i] += 몫
}

console.log(answer)

for (let i = 0; i < t; i++) {
  const 몫 = parseInt(arr[i] / 3)
  const 나머지 = arr[i] % 3

  answer[i] += 몫 + 나머지
}

console.log(answer)
```
