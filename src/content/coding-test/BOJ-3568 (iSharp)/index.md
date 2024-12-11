---
title: "BOJ-3568 (iSharp)"
published: 2022-08-06
description: iSharp (https://www.acmicpc.net/problem/3568)
category: 코테
draft: false
tags:
  - 코딩테스트
  - 백준
---

- 왜 틀렸는지 모르겠다..

```js
const fs = require("fs");

let 기본변수 = "";

const 선언문 = fs
  .readFileSync("./test")
  .toString()
  .trim()
  .split(", ")
  .map((p, idx) => {
    if (idx === 0) {
      const val = p.split(" ");
      기본변수 = val[0];
      return val[1];
    }

    return p;
  });

const answer = 선언문.map((val) => {
  const 특수문자정규식 = /[\[\]\*\&]/gi;
  const 문자정규식 = /[a-zA-Z]/gi;

  const 특수문자 = val.match(특수문자정규식);
  const 문자 = val.match(문자정규식);

  const 특문예외처리 = 특수문자
    ? 특수문자.reverse().join("").replace("][", "[]")
    : "";

  return `${기본변수}${특문예외처리} ${문자.join("")};`;
});

console.log(answer.join("\n"));
```
