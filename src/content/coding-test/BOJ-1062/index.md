---
title: "BOJ-1062"
published: 2022-07-18
description: 가르침 (https://www.acmicpc.net/problem/1062)
category: 코테
draft: false
tags:
  - 코딩테스트
  - 백준
---

```
const fs = require("fs")
const [input, ...arr] = fs.readFileSync("./test").toString().trim().split("\n")

const prefix = ["a", "n", "t", "i", "c"]
const [n, k] = input.split(" ")

// antic 이 5글자 이므로 최소 5글자 이상 배울 수 있어야 하나의 단어를 읽을 수 있음
if (k <= prefix.length) {
  console.log(0)
  return
}

// 배움이 필요한 단어들
const words = new Set(prefix)

// 중복처리
arr.forEach(v => {
  if (!words.has(v)) {
    new Set(v).forEach(sv => words.add(sv))
  }
})

// 모두 배울 수 있으면 전체 단어 개수 return
if (words.length + prefix.length <= k) {
  console.log(arr.length)
  return
}

let count = []
const countReadableWords = p =>
  arr.reduce((prev, curr) => {
    if (Array.from(new Set(prev)).every(v => words.has(v))) {
      curr += 1
    }

    return curr
  }, 0)

const arrWords = Array.from(words)

const dfs = (learned, idx) => {
  if (learned.length === k - prefix.length) {
    count.push(countReadableWords(learned))
    dfs(learned.slice(0, learned.length - 1), idx - 1)
    return
  }

  dfs(learned + arrWords[idx], idx + 1)
}
```

answer

```
const fs = require("fs")
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n")

;(function solution(input) {
  const [n, k] = input[0].split(" ").map(Number)

  if (k < 5) {
    console.log(0)
    return
  } else if (k === 26) {
    console.log(n)
    return
  }

  const words = input.slice(1).map(word => {
    let check = 0
    for (let i = 0; i < word.length; i++) {
      check |= 1 << (word.charCodeAt(i) - 97)
    }
    return check
  })

  let learned = 0
  const required = "antatica"
  for (let i = 0; i < required.length; i++) {
    learned |= 1 << (required.charCodeAt(i) - 97)
  }
  const learnings = k - 5
  let maxLearnedWords = 0

  dfs(0, 0)

  console.log(maxLearnedWords)

  function dfs(cnt, start) {
    if (cnt >= learnings) {
      let learnedWords = 0
      words.forEach(word => {
        if ((word & learned) === word) learnedWords++
      })
      maxLearnedWords = Math.max(maxLearnedWords, learnedWords)
      return
    }

    for (let i = start; i < 26; i++) {
      if (!(learned & (1 << i))) {
        learned |= 1 << i
        dfs(cnt + 1, i + 1)
        learned ^= 1 << i
      }
    }
  }
})(input)
```
