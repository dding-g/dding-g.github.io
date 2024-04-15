---
title: "<script>의 defer와 async가 무엇인가요"
published: 2022-08-15T05:25:11.841Z
description: script 태그의 defer, async의 차이에 대해 풀어쓴 글
category: 무엇인가요 시리즈
draft: false
tags:
  - Javascript
---

우리는 `<script src=" ... "></script>` 태그를 통해 외부 리소스를 현재 페이지에 가져온다.

이때 브라우저는 동작을 멈추고 해당 리소스가 모두 다운로드 받아질 때 까지 기다린다.

다운로드 받는 동안 사용자는 멈춰있는 브라우저를 멍하니 바라보아야 하고, 찰나의 순간에도 사용자 이탈이 생기기 마련이다.

그래서 우리는 브라우저가 페이지의 HTML 파싱 작업에 더 신경쓸 수 있도록 배려해줘야 한다.

## async, defer

`async`는 javascript에서 흔하게 등장하는 단어이다.
Javascript 엔진은 하나의 Call stack으로 동작하기 때문에 기본적으로 `동기적 언어`이다.
하지만 우리는 위와 같은 상황처럼 특수한 상황에서 사용자를 기다리게 할 수 없기 때문에 "비동기"로 동작할 수 있도록 해줘야한다.

기본적으로 `async` `defer` 둘 다 백그라운드에서 리소스를 다운로드 받는다.
따라서 다운로드를 받는 중에도 HTML 파싱 작업은 멈추지 않는다.

차이점은 "실행을 언제하는가?" 에서 오는데,

- `defer` : HTML 파싱이 끝난 이후 차례대로 실행된다.
  - `defer` 태그가 달린 스크립트가 차례로 있을 때, 다운로드가 완료된 순서에 상관없이 선언된 순서대로 스크립트가 실행된다.
  - `DOMContentLoaded` 이벤트가 발생되기 전에 `defer`가 실행된다.
  - ```html
    <script defer src="https://asdf.com/big.js"></script>
    <script defer src="https://asdf.com/small.js"></script>
    ```
  - 실행 순서 : `big -> small`
- `async` : 페이지와 완전히 독립적으로 실행된다.
  - 리소스가 모두 다운로드된 직후 선언 순서와 관계 없이 실행된다. 다운로드 받을때는 백그라운드에서 동작하기 때문에 HTML 파싱에 영향을 주지 않지만, 다운로드 완료 시점에 따라 DOM 생성 과정에 영향을 줄 수 있다.
  - `async`는 독립적으로 동작하기 때문에 `DOMContentLoaded` 이벤트 실행 시점과는 상관없다.
  - ```html
    <script async src="https://asdf.com/big.js"></script>
    <script async src="https://asdf.com/small.js"></script>
    ```
  - 실행 순서 : `small -> big` (small이 먼저 다운받아진다는 가정 하. big이 먼저 다운로드 받아지면 먼저 실행되기 때문에 기본적으로 실행 순서는 보장할 수 없다. `Google Analytics` 처럼 사용자의 트래픽을 추적해야하는 경우 async 가 잘 맞는다고 볼 수 있다.)

---

참고 링크

- [defer, async 스크립트](https://ko.javascript.info/script-async-defer)
