---
title: "이벤트 루프는 무엇인가요?"
date: "2022-07-15T13:05:33.679Z"
description: "이벤트 루프는 무엇인가요? 영상을 보고 정리한 글 (https://www.youtube.com/watch?v=8aGhZQkoFbQ)"
tags:
  - "Javascript"
---

![브라우저 동작 과정](/images/eventloop.jpeg)

- [youtube : 이벤트 루프는 무엇인가요](https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=12s)

2014년 영상이지만 Event loop와 브라우저에서 Javascript가 동작하는 과정을 너무 잘 설명한 영상.

- JS는 싱글스레드임. 결국 한번에 하나의 스레드만 실행할 수 있다. 동시에 하나의 코드만 실행할 수 있다는 뜻.
- 콜 스택은 데이터 스트럭처로 실행되는 순서를 기억하고 있다. 스택의 가장 위 쪽에서 함수를 꺼내는게 전부다. 아래 사진처럼 에러가 나게 되면 callstack을 역순으로 출력해 보여준다.
- `Non-Blocking IO 어쩌고...` 같은 문구는 이런 싱글 스레드 기반인 Javascript가 `동시성`을 지원하기 때문이다.

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

  - `web Api` 과 js runtime 환경은 다르다. `setTimeout`은 js runtime 환경에서 실행된 직후 `web Api`로 옮겨진 뒤 timer가 실행된다.
  - WebApi에서 완료된 테스크의 callback은 task queue로 들어가게 된다.
  - 이벤트 루프의 역할은 callstack과 task queue를 주시하고 있는 것 이다. callstack이 **비어있으면** task queue 최상위 값을 빼서 stack에 넣어준다.
    ```js
    setTimeout(() => {
      console.log("TIMEOUT 0!!")
    }, 0)
    ```
    를 다른 코드와 같이 실행시켜보면 call stack이 빈 후에 이벤트 루프가 동작한다는걸 알 수 있다.

- Microtask queue

  - `ECMA`에서는 `PromiseJobs`라는 내부 queue를 사용한다. V8 엔진에서는 이를 `Microtask queue`라고 부른다.

    - Microtask queue는 Call Stack이 비어있을 때 차례로 실행된다.
    - `Promise`가 처리 될 때 `.then/.catch/.finally`는 마이크로태스크 큐에 들어가게 된다. 그래서 Call stack이 빈 다음 결과가 실행된다.
    - `unhandled rejection` 에러는 마이크로태스크 큐 끝에서 Promise 에러가 처리되지 못할 때 발생한다. Promise 체인에 `.catch`를 추가 해준다면 상관 없으나, 에러가 발생한 다음에 Promise 체인에 `.catch`를 추가해준 경우에는 에러가 발생한다.
    - ```js
      let promise = Promise.reject(new Error("ERRROR!"))
      setTimeout(() => promise.catch(err => alert("Catch!")), 1000)

      window.addEventListener("unhandledrejection", event =>
        alert(event.reason)
      )
      ```

    - 위 경우에 `setTimeout` 내부에서 에러를 catch 해줬으나 `Microtask queue`에 들어가기 전, 이미 `Promise.reject`가 실행되어 비어있는 상태이기 때문에 `unhandledrejection`가 실행된다.

---

참고 링크

- [마이크로태스크](https://ko.javascript.info/microtask-queue)
- [youtube : 이벤트 루프는 무엇인가요](https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=12s)
