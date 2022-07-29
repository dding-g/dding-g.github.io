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

**GET, POST가 어떻게 다른지 설명해주세요**

- GET은 Idempotent, POST는 Non-idempotent하게 설계되어 있음.
  - 멱등성
- 서버에게 GET 요청을 여러번 보내도 같은 데이터를 가져옴.

## Javascript

[**모듈 시스템의 차이점**](../../study-js/Javascript에서의%20모듈%20시스템/index.md)

[**호이스팅이 무엇인가요?**](../../study-js/호이스팅이%20무엇인가요/index.md)

[**클로저는 무엇인가요? 원리와 왜 사용하는지 설명해주세요.**](../../study-js/클로저가%20무엇인가요/index.md)

[**이벤트 루프는 무엇인가요?**](../../study-js/이벤트%20루프는%20무엇인가요?/index.md)

**cjs esm의 차이, 왜 Typescript에서는 cjs를 사용하지 않을까?**

## React

## HTML CSS

**CSS에서 margin과 padding에 대해서 설명해주세요**

- padding은 겹치지 않는데 margin은 겹친다.

## Frontend

[**홈페이지가 사용자에게 보이기 까지**](../홈페이지가%20사용자에게%20보이기까지/index.md)

## ETC

**자기소개**
기술 스택, 전 회사 경력.

**debounce 쓰로틀링을 설명하고 두개의 차이를 설명하라**

- 정리 필요

**OOP 특징**

- OOP의 특징을 JS에서 어떻게 사용할 수 있는가?
  - 추상화
  - 캡슐화
  - 상속성
  - 다형성
    - 같은 함수명을 다른 방식으로 사용하는 것. 오버라이딩, 오버로딩
    - Javascript에서 오버라이딩, 오버로딩
      - 오버로딩은 Javascript에서 지원하지 않는다. args 객체를 이용해서 구현할 수 있을 것 같음.

**클로저 뭔지, 어떻게 사용하는지**

**프로토타입이 뭔지**

- 프로토타입은 객체이고 상속을 받은 자식 객체에게

**JS에서 프로미스는 어떻게 동작하는지**

- pending rejected fullfilled

**Arrow function 일반 function 차이**

- this 바인딩의 차이
- 딥다이브 책에 나와있음
- arrow에서는 prototype 이 없다
  - args가 없다
  - 생성자 함수로 사용할 수 없다. (call말고 constructor)

**이벤트 루프에 대해서 설명을 해라**

- micro task queue와 일반 task queue와 다른점

---

**this가 바인딩 되는 세가지 경우**

- 그냥 window가 바인딩
- 생성자 함수(나중에 생성되는 인스턴스 객체)
- 객체 안에서 this를 사용한 경우

**var let const를 브라우저에서 선언했을떄**

- var는 전역, let const는 아님.

**얕은 복사, 깊은 복사**

- JSON 형식 -> 다시 객체로 변경하기
- spread 연산자
- Array copy
- object안에 object는 어떻게 deepcopy?
  - 재귀적으로 호출해서 type체크. object면 deepcopy

**call, apply, bind**

- 공부

**원시값에 붙어있는 함수는 어떻게 쓸 수 있는가?**

- Javascript엔진이 타입 체크해서 암묵적으로 원시값을 wrapping함

**Scope란?**

- 식별자의 유효범위. 공부.
- 렉시컬 스코프란?
  - 렉시컬 환경. 정적 스코프, 동적 스코프

**Property attribute**

- Object freeze, Object seal, Object preventExtensions
- readOnly, edit 가능. 속성값 추가/삭제 불가, 확장만 불가.

---

**크로스 브라우징이 무엇인가요?**

- 크로스 브라우징은 웹 표준에 따라 서로 다른 OS 또는 플랫폼에 대응하는 것을 말한다. 브라우저별 렌더링 엔진이 다른 상황 등 어떠한 상황 속에서도 문제 없이 동작하게 하는 것을 목표로 한다. 프론트엔드 개발자는 여러가지 전략을 세울 수가 있는데, feature detection(기능 탐지)을 사용해서 해당 기능이 해당 브라우저에 있는지를 확인하는 방법을 사용할 수도 있다. 특히 한 쪽 환경에 최적화를 하는 것 보다, 전체적인 웹 표준을 지키는 데에 노력해야 한다.

**CORS가 무엇이며 어떻게 해결을 할 수 있는지 설명해 보세요.**

- 다른 도메인에서 리소스 요청 시 cross-origin HTTP 에 의해 요청을 하는데, 대부분의 브라우저는 보안 상의 이유로 이 요청을 제한한다. 이를 동일 오리진 정책(Same Origin Policy)이라고 한다. 요청을 보내기 위해서는 요청 보내는 대상과 프로토콜이 같아야 하고, 포트도 같아야 한다. JSONP(JSON-padding)을 통해 해결하거나 특정 HTTP 헤더를 추가하여 이 이슈를 해결할 수 있다. 이와 같이 타 도메인 간 자원을 공유할 수 있게 해주는 것을 Cross Origin Resource Sharing, 줄여서 CORS라고 한다.

**빈 화면에서 렌더링이 완료 되기까지 너무 오래 걸린다는 피드백이 있을 때, 어떻게 하면 이 문제를 해결할 수 있을까요?(단, 캐시는 이미 적용 됨)**

- script 파일을 body tag 가장 하단에 위치시키거나 script 태그에 async 속성을 부여한다. 또는 네트워크 리소스 블라킹을 통해 불필요한 무거운 파일들을 제한한다.

**쿠키와 세션 스토리지, 로컬 스토리지의 차이를 설명해 주세요.**
기본적으로 쿠키와 로컬 스토리지, 세션 스토리지는 모두 브라우저에서 데이터 저장소의 역할을 하는 것들이다. 웹에서 로그인을 하기 위해서는 토큰을 발급받아 API를 호출해야 한다. 하지만 반복되는 작업을 계속 하게 되는 것이 비효율적이고, 이를 보완하기 위해 쿠키를 서버와 클라이언트에 생성해서 토큰 발급 없이 쿠키만 가지고 서버에 요청을 할 수 있게 된다. 쿠키는 저장 공간이 4KB로 작은 편인데 이러한 단점을 보완하여 만든 것이 웹 스토리지이다.

웹 스토리지는 서버에 클라이언트 데이터를 저장하지 않는다. 웹 스토리지에는 로컬 스토리지와 세션 스토리지가 있는데 로컬 스토리지는 브라우저에 정보가 계속해서 남아있는 반면, 세션 스토리지는 해당 세션이 끝나면, 즉 브라우저가 닫히면 데이터가 사라진다. 웹 스토리지는 데스크탑 기준 5~10MB의 저장 공간을 가지고 있어서 쿠키에 비해 훨씬 저장공간이 크다는 장점이 있다. 웹 스토리지는 반면 HTML5부터 지원하기 때문에 이전 브라우저에서는 지원이 되지 않는다는 단점이 있다.

**프로그레시브 렌더링(Progressive Rendering)이 무엇인가요?**
프로그레시브 렌더링은 컨텐츠를 가능한 빨리 표시하기 위해 성능을 향상시키는 기술이다. 인터넷 속도가 느리거나 불안정한 모바일 환경이 아직 많이 남아있기 때문에 이럴 때 유용하게 사용한다. 대표적으로 레이지 로딩이 있다. 이미지를 한 번에 로드하는 것이 아니라, 자바스크립트를 통해 사용자가 표시하려는 부분만 스크롤 시에 이미지를 로드하는 것이다.

**HTML5 tag를 설명해 주세요.**
모든 HTML 문서는 <!DOCTYPE> 선언으로 시작한다. HTML5의 경우 <!DOCTYPE html> 이런 식으로 말이다. 이 선언은 태그는 아니지만 브라우저가 어떤 타입을 받아들여야 할지를 알려주는 정보이다.

여러가지 태그가 있는데 주요한 것들 위주로 살펴보면, HTML5의 필수 태그는 html, head, body 등이 있다. html 태그는 HTML문서의 가장 최상단에 위치하는 태그이며, head 태그에는 style, script, title, link, meta 태그 등이 들어간다. body 태그는 HTML 문서의 내용이 들어간다.

meta 태그에 대해서 조금 더 살펴보면, meta 태그는 head 부분에서 다른 태그들(script, style, link, title 등)로 나타낼 수 없는 메타데이터를 나타내는 태그를 의미한다. <meta name="keywords" content="ABC"> 와 같이 검색 엔진을 위한 키워드나 <meta name="description" content="OWEN">과 같이 문서에 대한 설명 등에 사용된다. 화면에는 별다르게 표시되는 내용이 없지만, 검색 엔진이나 브라우저에서 읽힌다.

**Sementic tag에 대해서 설명해 주세요.**
시멘틱 태그는 HTML5에 도입이 되었는데, 개발자와 브라우저에게 의미있는 태그를 제공하는 것을 의미한다. 예를 들어 <div> 태그는 non-sementic 태그이고, <table>, <article>은 sementic 태그에 속한다. 시멘틱 태그는 태그만 보고 대략적으로 들어갈 내용을 유추할 수 있다는 장점이 있다. 헤더와 푸터를 설정할 때에도 과거에는 <div id="header"></div> 와 같이 했던 것을 이제는 <header> 하나로 깔끔하게 정리할 수 있다.

**점진적 향상법(progressive enhancement)과 우아한 성능저하법(graceful degradation)의 차이를 설명하실 수 있습니까?**
점진적 향상법 : 구형 브라우저에 100, 신형 브라우저에 150 구현
우아한 성능저하법 : 구형 브라우저에 50, 신형 브라우저에 100 구현

**Flash of Unstyled Content에 관해 설명해주세요. 또 FOUC를 피하기 위해선 어떻게 해야 하나요?**

- css @import 피하기
- body안에서 script 사용할때 dom 수정하는 부분 주의

---

0729

**<script>, <script async>와 <script defer>의 차이점에 관해 설명해주세요.**

- body 하단에 script 를 실행시키는 이유와 관련.
- async defer 모두 백그라운드에서 script 동작.
- async -> GA같은 곳에서 사용함.

**다음 코드가 즉시 호출 함수 표현식(IIFE)로 동작하지 않는 이유에 관해서 설명해보세요: function foo(){ }();. IIFE로 만들기 위해서는 어떻게 해야 하나요?**

이벤트 버블링(Event Bubbling)에 대해서 설명하세요.

- preventDefault, stopPropagation

SPA에서 SEO에 유리하도록 만들기 위한 방법에 대해 설명해주세요.

- SSR, Pre-rendering

이벤트 캡쳐링(Event Capturing)에 대해서 설명하세요.

: React에서 state를 왜 immutable하게 관리하는가?

- immutable하게 관리하지 않으면 객체 전체를 rerendering

: wrapper객체와 원시값

: this는 무엇인가?

- 일반 함수, 생성자 함수, 객체 메서드, addEventListener 안에서 각각 this가 바인딩 되는게 다름.

---

- babel 역할
- webpack 역할
  - 트리쉐이킹이 무엇이고 어떻게 동작하는가?
- jquery와 react의 차이점.
- v-dom 을 왜 사용하는가?
  - dom을 직접 수정하는 것보다 뭐가 더 좋은가? -> 한줄한줄 수정할 때 마다 re-rendering 되는데 v-dom은 한번에 수정해서 성능상 이점이 있다.
- position relative, absolute 의 속도 차이를
  - releative : layout 과정 후 [normal flow](https://developer.mozilla.org/ko/docs/Learn/CSS/CSS_layout/Normal_Flow)를 거쳐서 포지셔닝을 거친다.
    - releative 안에서 reflow가 일어나면 문서 전체가 리렌더 되는거나 마찬가지. height, width 수정 되면 형제, 부모 모두 수정 되어하기 때문
  - absolute : normal flow 과정을 거치지 않고 바로 포지셔닝을 거친다.
- CSR vs SSR
  - SEO에 노출되는 첫 페이지만 SSR로. 나머지는 CSR 페이지로 빌드
  - 열악한 글로벌 환경을 고려하면 CSR도 고려해볼만함.

다음주 월요일(8/1)은 Javascript 문제 5개 받고 CSS 5개 물어보기.
