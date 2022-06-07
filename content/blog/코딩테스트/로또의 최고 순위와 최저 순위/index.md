---
title: "[프로그래머스][레벨1] 로또의 최고 순위와 최저 순위"
date: "2022-06-07T12:37:17.872Z"
tags:
  - 코딩테스트
---

# [문제](https://programmers.co.kr/learn/courses/30/lessons/77484)

```
로또를 구매한 민우는 당첨 번호 발표일을 학수고대하고 있었습니다.
하지만, 민우의 동생이 로또에 낙서를 하여, 일부 번호를 알아볼 수 없게 되었습니다.
당첨 번호 발표 후, 민우는 자신이 구매했던 로또로 당첨이 가능했던
최고 순위와 최저 순위를 알아보고 싶어 졌습니다.
```

- 포인트 : 가려진 숫자들이 모두 맞았을때, 모두 틀린 경우를 구하면 된다.

# 풀이

```js
function solution(lottos, win_nums) {
  let correctCount = 0
  let zeroCount = 0

  lottos.forEach(pickNum => {
    if (win_nums.includes(pickNum)) correctCount += 1

    if (pickNum === 0) {
      zeroCount += 1
    }
  })

  const best = Math.min(Math.abs(correctCount + zeroCount - 6) + 1, 6)
  const worst = Math.min(Math.abs(correctCount - 6) + 1, 6)

  return [best, worst]
}
```

- 풀이 시간: 12분

- 다른 사람들의 풀이를 조금 참고해서 수정한 풀이는 아래와 같다.
  - 6이 아니라 7을 앞에서 빼면 abs는 쓸 필요 없음 ㅠ

```js
function solution(lottos, win_nums) {
  let correctCount = 0
  let zeroCount = 0

  lottos.forEach(pickNum => {
    if (win_nums.includes(pickNum)) correctCount += 1

    if (pickNum === 0) {
      zeroCount += 1
    }
  })

  const best = Math.min(7 - correctCount - zeroCount, 6)
  const worst = Math.min(7 - correctCount, 6)

  return [best, worst]
}
```

- best인 경우에는 correctCount가 모두 맞는 경우(6인 경우), worst인 경우에는 zeroCount가 6인 경우에 문제가 생기기 때문에 최대 값을 6으로 설정한 코드가 들어갔다.
- 기능적으로는 정상 동작하지만 코드상의 의미는 불명확 하기 때문에 좋은 코드는 아니라고 생각함.
