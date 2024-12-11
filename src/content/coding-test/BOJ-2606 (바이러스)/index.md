---
title: "BOJ-2606 (바이러스)"
published: 2022-07-12
description: "[문제링크](https://www.acmicpc.net/problem/2606)"
category: 코테
draft: false
tags:
  - 코딩테스트
  - 백준
---

```js
const fs = require("fs");
const [computerNum, graphNum, ...graphs] = fs
  .readFileSync("./testFile")
  .toString()
  .trim()
  .split("\n");

const graphMap = graphs.reduce((obj, graph) => {
  const graphArr = graph.split(" ");

  if (Array.isArray(obj[graphArr[0]])) {
    obj[graphArr[0]].push(graphArr[1]);
  } else {
    obj[graphArr[0]] = [graphArr[1]];
  }

  if (Array.isArray(obj[graphArr[1]])) {
    obj[graphArr[1]].push(graphArr[0]);
  } else {
    obj[graphArr[1]] = [graphArr[0]];
  }

  return obj;
}, {});

// 1번 컴퓨터가 바이러스가 걸렸을 때 감염되는 컴퓨터 수 반환
const detechVirusGraph = (key, countSet) => {
  if (!Array.isArray(graphMap[key])) {
    return countSet;
  }

  return graphMap[key].reduce((cntSet, val) => {
    if (cntSet.has(val) || val == 1) {
      return cntSet;
    }

    cntSet.add(val);
    return detechVirusGraph(val, cntSet);
  }, countSet);
};

console.log(detechVirusGraph(1, new Set([])).size);
```
