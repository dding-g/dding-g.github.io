---
title: "FE 면접 질문 연습"
date: "2022-07-15T12:04:15.612Z"
description: FE 개발자 이직 공부
tags:
  - 이직
  - CS
---

참고 사이트

- https://realmojo.tistory.com/300
- https://xiubindev.tistory.com/119

## CS

**브라우저 주소창에 www.google.com을 입력하면 어떤 일이 일어나나요?**

**GET, POST가 어떻게 다른지 설명해주세요**

- GET은 Idempotent, POST는 Non-idempotent하게 설계되어 있음.
  - 멱등성
- 서버에게 GET 요청을 여러번 보내도 같은 데이터를 가져옴.

## Javascript

**모듈 시스템의 차이점**

- cjs esm umd amd

**호이스팅이 무엇인가요?**

- let const 는 호이스팅이 일어날까요? TDZ

**클로저는 무엇인가요? 원리와 왜 사용하는지 설명해주세요.**

> 함수를 반환하는 함수.
> 은닉화

[**이벤트 루프는 무엇인가요?**](../../study-js/이벤트%20루프는%20무엇인가요?/index.md)

## React

## HTML CSS

**CSS에서 margin과 padding에 대해서 설명해주세요**

- padding은 겹치지 않는데 margin은 겹친다.

## Frontend

**홈페이지가 사용자에게 보이기 까지**

- reflow repainting

> [Naver D2](https://d2.naver.com/helloworld/59361)

## ETC

**자기소개**
기술 스택, 전 회사 경력.

**debounce 쓰로틀링을 설명하고 두개의 차이를 설명하라**

**OOP 특징**

- OOP의 특징을 JS에서 어떻게 사용할 수 있는가?

**클로저 뭔지, 어떻게 사용하는지**

**프로토타입이 뭔지**

**JS에서 프로미스는 어떻게 동작하는지**

- pending rejected fullfilled

**Arrow function 일반 function 차이**

- this 바인딩의 차이
- 딥다이브 책에 나와있음

**이벤트 루프에 대해서 설명을 해라**

- micro task queue와 일반 task queue와 다른점
