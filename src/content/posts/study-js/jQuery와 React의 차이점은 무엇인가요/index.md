---
title: "jQuery와 React의 차이점은 무엇인가요?"
published: 2022-08-01T08:24:25.177Z
description: jQquery vs React
category: 무엇인가요 시리즈
draft: false
tags:
  - 태그1
  - 태그2
---

## 참고

- [번역 : 프로젝트에서 jQuery 의 사용을 그만두겠다고 결심한 이유](https://medium.com/%EC%98%A4%EB%8A%98%EC%9D%98-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C-jquery-%EC%9D%98-%EC%82%AC%EC%9A%A9%EC%9D%84-%EA%B7%B8%EB%A7%8C%EB%91%90%EA%B2%A0%EB%8B%A4%EA%B3%A0-%EA%B2%B0%EC%8B%AC%ED%95%9C-%EC%9D%B4%EC%9C%A0-45379cba95b6)
- [educative.io - jQquery vs React](https://www.educative.io/answers/jquery-vs-react)

## jQuery는 뭐가 좋고 뭐가 안좋은가?

`적게 작성하고, 더 많이` 라는 슬로건을 가지고 있음.
코드는 짧고 간결하게 쓰고 더 많은 action을 취할 수 있게 하자는 뜻 인듯.

세팅이 간단함.
성능 이슈가 있음.

- 직접 DOM을 조작하는 방식은 위험함. reflow 이벤트가 발행하면 자식, 부모, 조상요소 모두 다시 레이아웃을 계산하기 때문.

명령형 프로그래밍

## React는 뭐가 좋고 뭐가 안좋은가?

재사용이 가능한 코드
Virtual DOM을 사용하기 때문에 jQuery처럼 하나씩 DOM에 접근해서 re-rendering을 시키는 것 보다 변경된 데이터를 한번에 바꾸기 때문에 더 빠름.
데이터 중심

선언적 프로그래밍
