---
title: "이벤트 루프는 무엇인가요?"
date: "2022-07-15T13:05:33.679Z"
description: "이벤트 루프는 무엇인가요? 영상을 보고 정리한 글 (https://www.youtube.com/watch?v=8aGhZQkoFbQ)"
tags:
  - "Javascript"
---

## [youtube : 이벤트 루프는 무엇인가요](https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=12s)

![브라우저 동작 과정](/images/eventloop.jpeg)

2014년 영상이지만 Event loop와 브라우저에서 Javascript가 동작하는 과정을 너무 잘 설명한 영상.

- JS는 싱글스레드임. 결국 한번에 하나의 스레드만 실행할 수 있다. 동시에 하나의 코드만 실행할 수 있다는 뜻.
- 콜 스택은 데이터 스트럭처로 실행되는 순서를 기억하고 있다. 스택의 가장 위 쪽에서 함수를 꺼내는게 전부다. 아래 사진처럼 에러가 나게 되면 callstack을 역순으로 출력해 보여준다.

![callstack](/images/callstack.png)

- `Maximum Call Stack Size Exceeded` 에러는 이런 callstack에 너무 많은 데이터가 쌓여있다는 뜻 이다.

- `blocking` : 느려진다는건 어떤 걸 의미하나요?
  - 느린 동작이 스택에 남아있는 것을 blocking이라고 함.
  - 네트워크 요청은 컴퓨터 입장에서는 느림.
  - 자연스러운 UI UX를 위해서는 callstack이 blocking되는건 막아야함.
  - `setTimeout`이 실행되는 과정
    - `setTimeout`은 callstack에 들어온 직후 사라진다. (꺼내진다)
    - 여기서 `동시성`과 `이벤트 루프`를 설명할 수 있다.
- `동시성`과 `이벤트 루프`

  - `webapis` 과 js runtime 환경은 다르다. `setTimeout`은 js runtime 환경에서 실행된 직후 `webapis`로 옮겨진 뒤 timer가 실행된다.
  - WebApi에서 완료된 테스크의 callback은 task queue로 들어가게 된다.
  - 이벤트 루프의 역할은 callstack과 task queue를 주시하고 있는 것 이다. callstack이 **비어있으면** task queue 최상위 값을 빼서 stack에 넣어준다.
    ```js
    setTimeout(() => {
      console.log("TIMEOUT 0!!")
    }, 0)
    ```
    를 다른 코드와 같이 실행시켜보면 call stack이 빈 후에 이벤트 루프가 동작한다는걸 알 수 있다.
