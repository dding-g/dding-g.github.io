---
title: "BOJ-2504"
published: 2022-07-16
description: 괄호의 값
category: 코테
draft: false
tags:
  - 코딩테스트
  - 백준
---

```
const fs = require("fs")
const bracket = fs.readFileSync("./test").toString().trim().split("")

const startPrefix = ["(", "["]
const endPrefix = [")", "]"]

const stack = []

let ret = 0

const compare = (a, b) => {
  if ((a === "(" && b === ")") || (a === "[" && b === "]")) return true

  return false
}

const calc = (val) => {
  if(stack[stack.length-1])
  const last = stack.pop();
    const isNormal = compare(s, last);

}

for(let i =0  ;i < bracket.length ; i++){
  if(endPrefix.includes(bracket[i])){
    let isEndPrefix = true;

    while(isEndPrefix){
      const last = stack.pop();
      const isNormal = compare(bracket[i], last);

      if(!isNormal) {
        console.log(0);
        return;
      };

    }

  }

  stack.push(s);
}

```
