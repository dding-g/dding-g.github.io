---
title: "폴리필(polyfill)이 무엇인가요"
date: "2022-08-01T06:38:08.094Z"
description: 폴리필(polyfill)에 대해 간단하게 풀어 쓴 글
tags:
  - Javascript
  - Frontend
---

## 정의

Frontend와 Javascript는 끊임없이 빠르게 발전한다.

[babel이 무엇인가요?](../babel이%20무엇인가요/index.md) 에서도 살펴보았듯, ES6 Typescript 등 개발자 친화적인 플러그인, 문법들이 쏟아져나온다.

`babel`은 구형 브라우저에서 개발자가 작성한 코드들이 동작하도록 es5 문법으로 컴파일시켜주는 역할을 한다.

그렇다면 `polyfill`은 어떤 역할을 해주는걸까?

`polyfill` : 충전 솜

말 그대로 babel이 es5로 트랜스파일링 할 때 es6 부터 추가된 표준인 `Map, Promise ...` 등은 변환할 수 없기 때문에, 이걸 es5 문법으로 바꿀 수 있도록 부족한 부분을 채워주는 `충전 솜` 같은 친구를 `polyfill` 이라고 한다.

대표적으로 [`core-js`](https://github.com/zloirock/core-js) 또는 [`polyfill-service`](https://github.com/financial-times/polyfill-service) 를 사용한다.
