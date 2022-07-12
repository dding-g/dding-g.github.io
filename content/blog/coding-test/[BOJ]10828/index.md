---
title: "[BOJ]10828(스택)"
date: "2022-06-14T20:09"
description: 백준 알고리즘 테스트 10828 스택문제(https://www.acmicpc.net/problem/10828)
tags:
  - 코딩테스트
  - 백준
---

# 문제

```
정수를 저장하는 스택을 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 다섯 가지이다.

push X: 정수 X를 스택에 넣는 연산이다.
pop: 스택에서 가장 위에 있는 정수를 빼고, 그 수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.
size: 스택에 들어있는 정수의 개수를 출력한다.
empty: 스택이 비어있으면 1, 아니면 0을 출력한다.
top: 스택의 가장 위에 있는 정수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.
```

- 문제를 보고 쉽다고 생각했는데, 풀이법은 쉽지만 시간 초과나 백준에서 JS input을 받는 방법 같은 부분을 알 수 있게 되었음.

# 풀이

```js
// https://www.acmicpc.net/problem/10828

const readLine = require("readline")
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const stackArr = []
const output = []

const push = x => {
  stackArr.push(Number(x))
}

const pop = () => {
  const num = stackArr.pop()
  if (num) {
    output.push(num)
  } else {
    output.push(-1)
  }
}

const size = () => {
  output.push(stackArr.length)
}

const empty = () => {
  output.push(stackArr.length === 0 ? 1 : 0)
}

const top = () => {
  output.push(
    stackArr[stackArr.length - 1] ? stackArr[stackArr.length - 1] : -1
  )
}

let lineCount = 0
let isFirstLine = true

rl.on("line", line => {
  if (isFirstLine) {
    lineCount = Number(line)
    isFirstLine = false
  } else {
    const [cmd, value] = line.split(" ")

    const fn = {
      push,
      pop,
      size,
      empty,
      top,
    }

    if (fn[cmd]) {
      fn[cmd](value)
    }

    lineCount -= 1

    if (lineCount === 0) {
      console.log(output.join("\n"))
      process.exit(0)
    }
  }
}).on("close", () => process.exit(0))
```

- 첫번째 입력을 어떻게 받아야할지 고민하다가 boolean으로 처리했는데 이렇게 처리하는게 좋은 방법인지 모르겠어서 검색해 보았다.
  - `const [n, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");`
  - 해당 방법으로 풀이하신 분이 계셔서 나중에 input을 받을 때도 이 방법으로 받으면 좋을 것 같긴 하나, split이 시간이 많이 소요되는거로 알고 있는데, 괜찮을지 모르겠다.
- 다른 분들 풀이에는 push, pop, size, empty, top를 따로 선언하지 않고 처음부터 object안에 넣을 걸 그랬다.
