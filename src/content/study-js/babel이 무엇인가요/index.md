---
title: "babel이 무엇인가요?"
published: 2022-08-01
description: babel이 무엇인가를 간단하게 풀어쓴 문서
category: 무엇인가요 시리즈
draft: false
tags:
  - Javascript
  - Frontend
---

## 정의

**Babel은 Javascript 컴파일러 입니다.**

[Babel Document](https://babeljs.io/docs/en/)를 들어가면 맨 처음 나오는 문구이다.

그러면 컴파일러는 무엇인가?

사람의 언어에 가까운 고급 프로그래밍 언어들을 기계가 알아먹을수 있도록 기계어로 변환해주는 친구를 우리는 `컴파일러` 라고 부른다.

하지만 Javascript는 인터프리터 언어이다. 컴파일러 언어와는 다르게 기계어로 변환하는 과정을 거치지않고 한줄씩 해석하고 내려가면서 실행시키는 언어이기 때문에 Javascript 컴파일러 라는 단어는 조금 어색하다.

하지만 babel을 `컴파일러` 혹은 `트랜스파일러` 라고 부르는 것 보다 더 나은 호칭은 없다.

왜 그럴까?

Frontend 생태계도 빠르게 발전하면서 여러 기술을 내놓고 있다.

Javascript 또한 발전하면서 ES5, ES6, JSX, Typescript 와 같은 이전과 다른 여러가지 문법이 존재한다.

새로운것들이 추가되면 브라우저는 새로운 Javascript를 서포트하기 위한 새로운 버전을 출시할 것이다.

하지만 모든 사용자들이 항상 최신 버전의 브라우저를 쓴다는 보장은 없다.

또 Firefox, Chrome, Safari 등 많은 브라우저들이 존재하고 각기 다른 [렌더링 엔진](https://namu.wiki/w/%EB%A0%8C%EB%8D%94%EB%A7%81%20%EC%97%94%EC%A7%84)과 [Javascript 엔진](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8_%EC%97%94%EC%A7%84)을 사용한다.

따라서 구형 브라우저들을 지원하고 브라우저별로 지원하지 않는 기능을 서포트하기 위한 [`polyfill`](<../폴리필(polyfill)이%20무엇인가요/index.md>) 플러그인을 사용하기 위해 우리는 `babel`을 사용한다.
