---
title: "FE 면접 질문 연습"
published: 2022-07-15T12:04:15.612Z
description: FE 개발자 이직 공부
category: CS
tags:
  - 이직
  - CS
---

참고 사이트

- https://realmojo.tistory.com/300
- https://xiubindev.tistory.com/119
- https://h5bp.org/Front-end-Developer-Interview-Questions/translations/korean/
- https://www.frontendinterviewhandbook.com/kr/javascript-questions

## CS

- `debounce` `throttle`은 무엇이 다른가요?
  - `debounce` : 최근 요청을 기준으로 일정 시간 기다린 후 요청을 수행한다.
    - ```js
      const fn = debounce(() => {
        console.log("debounce!")
      }, 1500)
      ```
    - `fn`이 실행되고 1초 후 다시 `fn`이 실행되면 이전 요청은 무시되기 떄문에 총 2.5초 이후에 function이 실행된다.
  - `throttle` : 최초 요청을 기준으로 일정 시간을 기다린 후 요청을 수행한다.
    - ```js
      const fn = throttle(() => {
        console.log("debounce!")
      }, 1500)
      ```
    - `fn`이 실행되고 1초 후 다시 `fn`이 실행되면 이후 요청은 무시되고 1.5초 이후에 `fn`이 한번 실행된다.

## Network

- **GET, POST가 어떻게 다른지 설명해주세요**
  - GET은 Idempotent, POST는 Non-idempotent하게 설계되어 있음.
    - 멱등성
  - 서버에게 GET 요청을 여러번 보내도 같은 데이터를 가져옴.
- **CORS가 무엇이며 어떻게 해결을 할 수 있는지 설명해 보세요.**
  - 다른 도메인에서 리소스 요청 시 cross-origin HTTP 에 의해 요청을 하는데, 대부분의 브라우저는 보안 상의 이유로 이 요청을 제한한다. 이를 동일 오리진 정책(Same Origin Policy)이라고 한다. 요청을 보내기 위해서는 요청 보내는 대상과 프로토콜이 같아야 하고, 포트도 같아야 한다. JSONP(JSON-padding)을 통해 해결하거나 특정 HTTP 헤더를 추가하여 이 이슈를 해결할 수 있다. 이와 같이 타 도메인 간 자원을 공유할 수 있게 해주는 것을 Cross Origin Resource Sharing, 줄여서 CORS라고 한다.

## Javascript

- [**모듈 시스템의 차이점**](/study-js/Javascript에서의%20모듈%20시스템)
- [**호이스팅이 무엇인가요?**](/study-js/호이스팅이%20무엇인가요)
- [**클로저는 무엇인가요? 원리와 왜 사용하는지 설명해주세요.**](/study-js/클로저가%20무엇인가요)
- [**이벤트 루프는 무엇인가요?**](/study-js/이벤트%20루프는%20무엇인가요)
- [**프로토타입이 무엇인가요?**](</study-js/프로토타입(prototype)이%20무엇인가요>)
- [**실행 컨텍스트가 무엇인가요?**](/study-js/실행%20컨텍스트가%20무엇인가요)
- [**babel이 무엇인가요?**](/study-js/babel이%20무엇인가요)
- [**polyfill이 무엇인가요?**](</study-js/폴리필(polyfill)이%20무엇인가요>)
- [**webpack이 무엇인가요?**](/study-js/webpack이%20무엇인가요)
- [**Scope가 무엇인가요?**](</study-js/스코프(Scope)가%20무엇인가요>)
- **Property attribute**
  - Object freeze, Object seal, Object preventExtensions
  - readOnly, edit 가능. 속성값 추가/삭제 불가, 확장만 불가.
- **OOP의 특징을 JS에서 어떻게 사용할 수 있는가?**
  - 추상화
  - 캡슐화
  - 상속성
  - 다형성
    - 같은 함수명을 다른 방식으로 사용하는 것. 오버라이딩, 오버로딩
    - Javascript에서 오버라이딩, 오버로딩
      - 오버로딩은 Javascript에서 지원하지 않는다. args 객체를 이용해서 구현할 수 있을 것 같음.
- **원시값에 붙어있는 함수는 어떻게 쓸 수 있는가?**
  - Javascript엔진이 타입 체크해서 암묵적으로 원시값을 wrapping함
- **얕은 복사, 깊은 복사**
  - JSON 형식 -> 다시 객체로 변경하기
  - spread 연산자
  - Array copy
  - object안에 object는 어떻게 deepcopy?
    - 재귀적으로 호출해서 type체크. object면 deepcopy (Object.assign)
- **Arrow function 일반 function 차이**
  - arrow에서는 prototype 이 없다
  - args가 없다
  - 생성자 함수로 사용할 수 없다. (call말고 constructor)
- **this가 바인딩 되는 세가지 경우**
  - 그냥 window가 바인딩
  - 생성자 함수(나중에 생성되는 인스턴스 객체)
  - 객체 안에서 this를 사용한 경우
- **this가 동작하는 원리**
  [this의 동적 바인딩?](https://cocoder16.tistory.com/45)

  - 전역 : `this`는 strict 모드와 상관없이 전역 객체를 참조함
    - 현재 실행중인 컨텍스트와 관계 없이 동작하려면 `globalThis` 사용.
  - 함수
    - 단순 호출 : 전역 환경에서는 전역 객체(`window`) 호출.
    - 화살표 함수 : 상위 스코프를 가르킴. 전역 환경에서는 전역 객체 호출.
    - 생성자
      - `new` 키워드로 함수를 만들면 새로 생긴 객체를 지칭한다.
    - 객체내부의 함수
      - 객체 자신을 가르킨다.
      - 단, 함수가 호출될 때 동적 바인딩 된다
  - `addEventListener` 에서

    - 이벤트를 발생시킨 Element를 지칭
    - ```js
      // 처리기로 호출하면 관련 객체를 파랗게 만듦
      function bluify(e) {
        // 언제나 true
        console.log(this === e.currentTarget)
        // currentTarget과 target이 같은 객체면 true
        console.log(this === e.target)
        this.style.backgroundColor = "#A5D9F3"
      }

      // 문서 내 모든 요소의 목록
      var elements = document.getElementsByTagName("*")

      // 어떤 요소를 클릭하면 파랗게 변하도록
      // bluify를 클릭 처리기로 등록
      for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", bluify, false)
      }
      ```

  - 인라인 이벤트
    - `<button onclick="alert(this.tagName.toLowerCase());"> this : 자기 자신(button) </button> `
    - `<button onclick="alert((function() { return this; })());"> this : 전역 window </button>`

- **빈 화면에서 렌더링이 완료 되기까지 너무 오래 걸린다는 피드백이 있을 때, 어떻게 하면 이 문제를 해결할 수 있을까요?(단, 캐시는 이미 적용 됨)**
  - script 파일을 body tag 가장 하단에 위치시키거나 script 태그에 async 속성을 부여한다. 또는 네트워크 리소스 블라킹을 통해 불필요한 무거운 파일들을 제한한다.
- **동등(===),일치(==) 연산자의 피연산자를 함수로 사용했을때 어떻게 비교하나요?**
  - 피연산자가 둘 다 숫자면 해당 숫자를 서로 비교
  - 피연산자가 둘 다 문자열이면, 문자열의 첫 번째 문자부터 알파벳 순서대로 비교
  - 객체는 어떻게 비교해야 하는가?
    - `JSON.stringify()` 함수로 문자열로 변환한 다음 비교하거나, 재귀적으로 모든 keys를 돌아다니며 비교한다.

---

## CSS

- **CSS에서 margin과 padding이 무엇인가요?**
  - margin은 요소의 바깥에 빈 공간을 만들고, padding은 내부에 빈 공간을 추가한다.
  - padding은 음수가 존재하지 않지만 margin에서 음수값은 요소를 서로 가깝게 만든다.
- **position relative, absolute 의 차이가 무엇인가요?**

  - releative : layout 과정 후 [normal flow](https://developer.mozilla.org/ko/docs/Learn/CSS/CSS_layout/Normal_Flow)를 거쳐서 포지셔닝을 거친다.
    - releative 안에서 reflow가 일어나면 문서 전체가 리렌더 되는거나 마찬가지. height, width 수정 되면 형제, 부모 모두 수정 되어하기 때문
  - absolute : normal flow 과정을 거치지 않고 바로 포지셔닝을 거친다.
  - absolute -> 부모중 position 이 default 가 아닌걸 기준. 없으면 최상위 컨테이닝 블록을 따라간다.

- [컨테이닝 블록이 무엇인가요?](/study-css/컨테이닝%20블록이%20무엇인가요)

- **CSS에서 'C’는 Cascading을 의미합니다. Cascading에 관해서 설명해주세요. 또 cascading system의 장점은 무엇인가요?**

  - `Cascading` : 떨어지는. 위에서 아래로 종속되는.
  - 스타일 우선순위에 따라 보여지는 원리 이다.
    1. !important
    2. inline style
    3. id
    4. class
    5. 태그 이름 (`div` 등)
    6. 상위 객체에 의해 상속된 속성

- [`inline`과 `inline-block`의 차이점은 무엇인가요?](https://www.frontendinterviewhandbook.com/kr/css-questions/#inline-%EA%B3%BC-inline-block-%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94)
  - `inline-block`은 `width, height` 설정이 불가능하며 `x`축에 한해 `maring, padding`이 적용된다.

## Frontend

- [**홈페이지가 사용자에게 보이기 까지**](/study-cs/홈페이지가%20사용자에게%20보이기까지)
- [`script`태그의 `async` `defer`는 무엇이 다른가요?](/study-js/script%20태그의%20defer와%20async가%20무엇인가요)

- **CSR vs SSR**

  - SEO에 노출되는 첫 페이지만 SSR로. 나머지는 CSR 페이지로 빌드
  - 열악한 글로벌 환경을 고려하면 CSR도 고려해볼만함.
  - SPA는 Pre-rendering 을 통해 SEO 최적화를 할 수 있다.

- **크로스 브라우징이 무엇인가요?**

  - 크로스 브라우징은 웹 표준에 따라 서로 다른 OS 또는 플랫폼에 대응하는 것을 말한다. 브라우저별 렌더링 엔진이 다른 상황 등 어떠한 상황 속에서도 문제 없이 동작하게 하는 것을 목표로 한다. 프론트엔드 개발자는 여러가지 전략을 세울 수가 있는데, feature detection(기능 탐지)을 사용해서 해당 기능이 해당 브라우저에 있는지를 확인하는 방법을 사용할 수도 있다. 특히 한 쪽 환경에 최적화를 하는 것 보다, 전체적인 웹 표준을 지키는 데에 노력해야 한다.

- **쿠키와 세션 스토리지, 로컬 스토리지의 차이를 설명해 주세요.**

  - 기본적으로 모두 브라우저에서 데이터 저장소의 역할을 하는 것들이다. 웹에서 로그인을 하기 위해서는 토큰을 발급받아 API를 호출해야 한다. 하지만 반복되는 작업을 계속 하게 되는 것이 비효율적이고, 이를 보완하기 위해 쿠키를 서버와 클라이언트에 생성해서 토큰 발급 없이 쿠키만 가지고 서버에 요청을 할 수 있게 된다. 쿠키는 저장 공간이 4KB로 작은 편인데 이러한 단점을 보완하여 만든 것이 웹 스토리지이다.
  - 웹 스토리지에는 로컬 스토리지와 세션 스토리지가 있는데 로컬 스토리지는 브라우저에 정보가 계속해서 남아있는 반면, 세션 스토리지는 해당 세션이 끝나면, 즉 브라우저가 닫히면 데이터가 사라진다. 웹 스토리지는 데스크탑 기준 5~10MB의 저장 공간을 가지고 있어서 쿠키에 비해 훨씬 저장공간이 크다는 장점이 있다. 웹 스토리지는 반면 HTML5부터 지원하기 때문에 이전 브라우저에서는 지원이 되지 않는다는 단점이 있다.

- **프로그레시브 렌더링(Progressive Rendering)이 무엇인가요?**

  - 프로그레시브 렌더링은 컨텐츠를 가능한 빨리 표시하기 위해 성능을 향상시키는 기술이다. 인터넷 속도가 느리거나 불안정한 모바일 환경이 아직 많이 남아있기 때문에 이럴 때 유용하게 사용한다. 대표적으로 레이지 로딩이 있다. 이미지를 한 번에 로드하는 것이 아니라, 자바스크립트를 통해 사용자가 표시하려는 부분만 스크롤 시에 이미지를 로드하는 것이다.

- **HTML5 tag를 설명해 주세요.**

  - 모든 HTML 문서는 <!DOCTYPE> 선언으로 시작한다. HTML5의 경우 <!DOCTYPE html> 이런 식으로 말이다. 이 선언은 태그는 아니지만 브라우저가 어떤 타입을 받아들여야 할지를 알려주는 정보이다.
  - 여러가지 태그가 있는데 주요한 것들 위주로 살펴보면, HTML5의 필수 태그는 html, head, body 등이 있다. html 태그는 HTML문서의 가장 최상단에 위치하는 태그이며, head 태그에는 style, script, title, link, meta 태그 등이 들어간다. body 태그는 HTML 문서의 내용이 들어간다.
  - meta 태그에 대해서 조금 더 살펴보면, meta 태그는 head 부분에서 다른 태그들(script, style, link, title 등)로 나타낼 수 없는 메타데이터를 나타내는 태그를 의미한다. <meta name="keywords" content="ABC"> 와 같이 검색 엔진을 위한 키워드나 <meta name="description" content="OWEN">과 같이 문서에 대한 설명 등에 사용된다. 화면에는 별다르게 표시되는 내용이 없지만, 검색 엔진이나 브라우저에서 읽힌다.

- **Sementic tag에 대해서 설명해 주세요.**

  - 시멘틱 태그는 HTML5에 도입이 되었는데, 개발자와 브라우저에게 의미있는 태그를 제공하는 것을 의미한다. 예를 들어 `<div>` 태그는 non-sementic 태그이고, `<table>, <article>`은 sementic 태그에 속한다. 시멘틱 태그는 태그만 보고 대략적으로 들어갈 내용을 유추할 수 있다는 장점이 있다. 헤더와 푸터를 설정할 때에도 과거에는 `<div id="header"></div>` 와 같이 했던 것을 이제는 `<header>` 하나로 깔끔하게 정리할 수 있다.

- **Flash of Unstyled Content에 관해 설명해주세요. 또 FOUC를 피하기 위해선 어떻게 해야 하나요?**

  - css @import 피하기
  - body안에서 script 사용할때 dom 수정하는 부분 주의

- **이벤트 버블링(Event Bubbling)에 대해서 설명하세요.**

  - `form > div > p` 순으로 되어있는 요소에서 `p`를 클릭하면 p &rarr; div &rarr; form 순으로 이벤트가 발생한다. 이런 흐름을 `이벤트 버블링` 이라고 한다.
  - `event.target`은 이벤트가 발생한 **가장 안쪽 요소** 이고 `event.currentTarget`은 `this`. 즉, `event.currentTarget`을 호출한 요소이다.
  - `preventDefault`, `stopPropagation` 로 이벤트 버블링을 중단시킬 수 있다.
    - `stopImmediatePropagation`를 이용해서 상위 요소의 버블링 뿐만 아니라 핸들러가 실행되는 것 도 막을 수 있다. `stopPropagation`는 버블링은 막을 수 있지만 상위 요소의 핸들러가 실행되는건 막을 수 없다.
  - 이벤트 버블링은 최대한 막지 않는게 좋다. 상위 요소의 이벤트를 막은 경우 행동 패턴을 분석하는 등 window 내부에서 발새

- **이벤트 캡쳐링(Event Capturing)에 대해서 설명하세요.**

  - 하위 요소로 이벤트가 전파되는 단계
  - 거의 사용하지 않으나, 캡쳐링 단계를 추적하려면 `addEventListener(..., {capture: true})`로 설정해준다. `false`인 경우에는 버블링 단계, `true`면 캡쳐링 단계에서 핸들러가 실행된다.

- **이벤트 위임(Event Delegation)이 무엇인가요?**
  - 특정 Element만을 위해 이벤트를 등록하지 않고 dataset등을 활용하여 하나의 handler에 `event.target` 을 받아 해당 데이터로 이벤트를 구분하여 범용적으로 사용할 수 있도록 하는 패턴
  - [링크](https://ko.javascript.info/event-delegation)

---

## React

- **React에서 state를 왜 immutable하게 관리하는가?**

  - immutable하게 관리하지 않으면 객체 전체를 rerendering

- **lazy 로딩이 동작하는 방식**
  - React.lazy 를 사용하면?
  - webpack에서 번들해줄떄 포함하지 않고 번들함. 필요할때 받는 방식.
- Virtual DOM이 무엇이고 어떻게 동작하나요?
  - [vue에서 Virtual DOM](https://pinokio0702.tistory.com/363)
  -
- key를 사용하는 이유는 무엇인가요?
- JSX문법이 어떻게 사용되나요?
- useMemo, useCallback이 동작하는 방식을 설명해주세요.
- 렌더링 성능을 향상 시키기 위해 어떻게 해야하나요?
- Context API에 대해 설명해주세요.
- Context API vs Redux 비교
- Redux를 사용하는 이유는 무엇인가요?
- Redux의 장단점에 대해 이야기 해주세요.

---

## ETC

- **점진적 향상법(progressive enhancement)과 우아한 성능저하법(graceful degradation)의 차이를 설명하실 수 있습니까?**
  - 점진적 향상법 : 구형 브라우저에 100, 신형 브라우저에 150 구현
  - 우아한 성능저하법 : 구형 브라우저에 50, 신형 브라우저에 100 구현

---

- 개발하면서 무엇에 스트레스를 받나요?
- UTF-8, 유니코드, UTF-16 이 무엇인가요?
- HTTP1.1, HTTP2 차이
- HTTPS 암호화 방식
- OAuth 2.0
- TCP/IP 3 way handshake
- HTTP Status code간 비슷한것들 차이
- HTTP Method 설명
- 알고리즘 시간 복잡도
- ES6, V8 엔진 동작 원리
- OSI 7계층 (데이터 전달 과정)

---

- translate animation
- z-index
- inline과 inline-block의 차이점은 무엇인가요?
- CSS Selector가 어떠한 원리로 동작하는지 설명해주세요.
  - 효율성

---

- getElementsById가 어떻게 동작하는가?
- 정렬 알고리즘 종류
  - https://d2.naver.com/content/images/2020/01/img.png
  - 안정 정렬 -> 값이 같을때도 바뀌는가?
  - Javascript는 불안정 정렬
  - 배열 갯수에 따라서 알고리즘이 달라짐..
  - V8 -> 삽입정렬, 퀵정렬, 팀정렬(공부 해보기)
- 깊은 복사 방법 3가지 -> 2회 질문
- Solid가 무엇이고 React에서 어떻게 사용되는지? -> 2회 질문 (soild, oop가 어떻게 적용되는가?)
  - https://velog.io/@kim-jaemin420/reactReact%EC%97%90-%EC%A0%81%EC%9A%A9%ED%95%9C-SOLID-%EC%9B%90%EC%B9%99
- 아래에서 children은 다시 렌더링이 될까?
- ```js
  render() {
  	return (
  		<div>
  			{children} // component
  		</div>
  	)
  }
  render() {
  	return (
  		<span>
  			{children} // component
  		</span>
  	)
  }
  ```
