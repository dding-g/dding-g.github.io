---
title: "webpack이 무엇인가요?"
date: "2022-08-01T06:50:42.928Z"
description: webpack이 무엇인지 간단하게 풀어 쓴 글
tags:
  - Javascript
  - Frontend
---

## 정의

[Webpack Document](https://webpack.kr/concepts/) 첫줄에 이렇게 안내하고있다.

`webpack`은 Javascript 애플리케이션을 위한 **정적 모듈 번들러** 이다.

- `모듈`

  - Javascript는 ES6, CJS와 같은 [모듈 시스템](../Javascript에서의%20모듈%20시스템/index.md)이 존재하는데, 핵심은 `코드의 스코프를 나눠 파일 단위로 관리한다.` 이다.

- `번들러`
  - "번들" 이라는 것은 무엇을 하나로 묶는 작업이다. `XXX 번들러` 라고 한다면 `XXX` 를 하나로 묶는 도구를 말한다.

따라서 `Webpack`을 풀어쓰면

**파일 단위로 나뉜 Javascript 코드를 하나의 파일로 묶는 도구** 라고 할 수 있다.

여기엔 Javascript 파일 뿐만 아니라 CSS, Image, HTML 파일도 포함이다.

과거 Single Page Application 아닌 여러 HTML 파일로 이루어진 페이지 에서는 각 페이지별로 로드되는 Javascript 파일이나 CSS 파일이 달랐다.

하지만 SPA로 넘어오면서 하나의 페이지를 동적으로 관리하다보니 Javascript 전체를 로드해야 하는 상황이 생겼고 파일이 많아지면 많아질수록 한정된 네트워크 자원에서 쾌적하게 사용하기는 힘들었다.

이런 단점을 보완하기 위해 최소화된 파일 개수, 파일 크기를 만들어야 했고 트리쉐이킹 등 파일 사이즈를 줄이는 작업과 함께 `번들러` 라는 개념이 등장했다.

여기서는 Webpack을 다루지만 `rollup` `parcel` 등 수많은 Javascript 번들러가 존재한다.

## 동작 방식

Webpack은 내부적으로 `Entry Point(시작점)` 부터 [디펜던시 그래프](https://webpack.kr/concepts/dependency-graph/)를 생성한다.
이렇게 재귀적으로 디펜던시 그래프를 생성하고 모든 모듈을 하나의 `.js` 파일로 만들어 `Output` 옵션에 설정 된 경로로 내보낸다.

이 과정에서 `Webpack`은 기본적으로 Javascript 파일과 JSON 파일만 인식한다.

따라서 CSS 와 같은 파일을 번들링하기 위해서는 Webpack이 로드할 수 있도록 모듈로 변환하여 디펜던시 그래프에 추가되도록 해야한다. 이 과정에서 사용되는걸 `Loader(로더)`라고 한다.

기본적인 모듈 변환 이외에 번들 최적화, 에셋 관리, uglify 등 추가적으로 다양한 작업을 하기 위해서는 `Plugins(플러그인)`이 필요하다. 로더는 번들링을 위해 필요하지만, 플러그인은 번들링이 완료된 파일을 대상으로 처리한다.

webpack에 내장된 실행 환경별(production, development) 최적화 세팅을 사용하려면 [`Mode`](https://webpack.kr/configuration/mode)를 사용한다. develoment 모드 일 때는 트리쉐이킹 같은 코드 최적화를 진행하지 않으니 유의해야한다.

## 트리쉐이킹

나무를 흔들면 잔가지들이 우수수 떨어지는걸 본 적이 있을것이다.

이런 점에서 Webpack은 쓸모없는, 더이상 사용하지 않는 코드는 번들링에서 제외하고 최적화된 파일을 내보내고 싶어한다.

예를들어보자.

```js
// BAD
import * as test1 from "./test1"
import * as test2 from "./test2"
import * as test3 from "./test3"

// GOOD
import { testFn } from "./test1"
import testTwo from "./test2"
import { testFn3 } from "./test3"
```

첫번째 각 파일의 모든 모듈을 가져온다. 사용하지 않는 모듈이라고 할지라도 가져와서 사용할 수 있도록 상위 스코프에 붙인다.

따라서 아래 예시 처럼 사용하는 함수만 가져오거나 default로 export된 모듈만 가져오는거로도 트리쉐이킹을 할 수 있다.

webpack4 부터는 `sideEffects` 라는 속성을 지원하며 모듈 단위로 사용되지 않는 모듈은 제거한다.

[`terser`](https://github.com/terser/terser) 플러그인과 같이 사용할 수 있다.

`terser`는 구문 단위로 사이드 이펙트를 감지하지만 여러 상황 속에서 정확하게 사용되지 않는 코드라고 구문을 보고 분석하는건 쉽지 않다. 예를 들어 아래처럼 조건을 통해 사용되거나, 되지 않는 경우를 판별하는 경우가 그렇다. [여기](https://webpack.kr/guides/tree-shaking/#clarifying-tree-shaking-and-sideeffects) 코드를 참조하자.

그래서 `/*#__PURE__*/` 같은 주석을 사용해서 개발자가 정할 수 있도록 한다.
해당 코드가 여러 조건을 통해서 사용 되거나, 되지 않거나를 정하는 것 처럼
`사이드 이팩트`가 생길 여지가 있는지, 없는지를 개발자가 판단하고 `PURE` 여부를 정한다.

마지막으로 [Document](https://webpack.kr/guides/tree-shaking/#conclusion) 에서는 아래와 같은 결론을 내린다.

> - ES2015 모듈 구문을 사용해야 하는 것을 배웠습니다. (예: import와 export)
> - 컴파일러가 ES2015 모듈 구문을 CommonJS 모듈로 변환하지 않도록 해야 합니다. (이것은 인기 있는 Babel preset @babel/preset-env의 기본 동작입니다. 자세한 내용은 documentation를 참고하세요.)
> - package.json 파일에 "sideEffects" 속성을 추가하세요.
> - 최소화와 tree shaking을 포함한 다양한 최적화를 사용하려면 production mode 설정 옵션을 사용하세요.

## 참고

- https://ui.toast.com/fe-guide/ko_BUNDLER
- https://velog.io/@yon3115/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%ED%95%84%EC%88%98-Webpack%EC%9D%B4%EB%9E%80
- https://webpack.kr/concepts/
