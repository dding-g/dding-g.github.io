---
title: "[프로그래머스][레벨 1] 신고 결과 받기"
date: "2022-06-07T12:04:17.872Z"
tags:
  - "코딩테스트"
  - "프로그래머스"
---

📕 레벨 1짜리 쉬운 문제.

# [문제](https://programmers.co.kr/learn/courses/30/lessons/92334?language=javascript)

```
신입사원 무지는 게시판 불량 이용자를 신고하고
처리 결과를 메일로 발송하는 시스템을 개발하려 합니다.
무지가 개발하려는 시스템은 다음과 같습니다.

- 각 유저는 한 번에 한 명의 유저를 신고할 수 있습니다.
  - 신고 횟수에 제한은 없습니다. 서로 다른 유저를 계속해서 신고할 수 있습니다.
  - 한 유저를 여러 번 신고할 수도 있지만,
    동일한 유저에 대한 신고 횟수는 1회로 처리됩니다.
- k번 이상 신고된 유저는 게시판 이용이 정지되며,
  - 해당 유저를 신고한 모든 유저에게 정지 사실을 메일로 발송합니다.
  - 유저가 신고한 모든 내용을 취합하여
    마지막에 한꺼번에 게시판 이용 정지를 시키면서 정지 메일을 발송합니다.
```

- 포인트 : k번 이상 신고된 유저는 게시판 이용이 정지되고, 정지될 때 신고한 사람들에게 정지 사실을 메일로 보낸다. 이떄 유저에게 몇 회 메일이 발송될건지를 구하는 문제임.
- 문제를 잘 안읽고 햇갈려서 처음에 코드를 잘못 작성했다. 문제를 잘 읽고 포인트를 먼저 잡아야함. 국어 푸는 줄 ㅠ

# 풀이

```js
function solution(id_list, report, k) {
  const answer = {}

  // 신고 유저 Object화
  const reportInfo = id_list.reduce((prev, id) => {
    prev[id] = new Set()

    return prev
  }, {})

  // 신고 유저들 Set에 푸시
  report.forEach(data => {
    const [reportUser, reportedUser] = data.split(" ")

    reportInfo[reportedUser].add(reportUser)
  })

  // 신고당한 유저 정지 여부 확인
  id_list.forEach(id => {
    if (reportInfo[id].size >= k) {
      // 정지 당한 유저 메일 카운트
      reportInfo[id].forEach(reportedId => {
        if (answer[reportedId]) answer[reportedId] += 1
        else answer[reportedId] = 1
      })
    }
  })

  return id_list.map(id => answer[id] || 0)
}
```

- Map으로 관리해주어도 되는데, 그냥 Object만 사용해서 구현.
- 테스트 모두 통과. 푸는데 30분 정도 걸린 듯. 다음부터는 시간 측정도 해야할 듯.
