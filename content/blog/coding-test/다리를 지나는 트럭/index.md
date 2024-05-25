---
title: "[프로그래머스]다리를 지나는 트럭"
published: 2022-07-12T17:12:03.284Z
description: "[문제링크](https://school.programmers.co.kr/learn/courses/30/lessons/42583)"
category: 코테
draft: false
tags:
  - 코딩테스트
  - 프로그래머스
---

```js
function solution(bridge_length, weight, truck_weights) {
  let tick = 0
  let currentBridgeWeight = 0

  const waitingTrucks = [...truck_weights]
  const passingTrucks = []
  const passedTrucks = []

  while (passedTrucks.length !== truck_weights.length) {
    tick += 1 // 1초 경과

    // 현재 경과된 시간과 트럭이 진입한 시간차가 다리 길이 만큼이면 첫번째 passingTruck을 옮겨줌.
    if (
      passingTrucks.length > 0 &&
      tick - passingTrucks[0].tick === bridge_length
    ) {
      const { truck: passedTruck } = passingTrucks.shift()

      currentBridgeWeight -= passedTruck
      passedTrucks.push(passedTruck)
    }

    // 다리에 진입하기 위한 무게 체크
    if (
      waitingTrucks.length > 0 &&
      currentBridgeWeight + waitingTrucks[0] <= weight
    ) {
      const truck = waitingTrucks.shift()

      currentBridgeWeight += truck
      passingTrucks.push({ truck, tick }) // 견딜 수 있는 무게면 truck숫자와 언제 다리에 진입했는지 저장
    }

    // else { // 다리에 더이상 진입하지 못하면 첫번째 passing중인 트럭을 마지막으로.
    //     tick += bridge_length - tick - passingTrucks[0].tick - 1;
    // }
  }

  return tick
}
```
