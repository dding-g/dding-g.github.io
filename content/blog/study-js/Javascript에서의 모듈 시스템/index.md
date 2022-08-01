---
title: "Javascript에서의 모듈 시스템"
date: "2022-07-22T06:36:37.733Z"
description: CommonJS와 ES Module에 대해.
tags:
  - Javascript
---

## Javascript 모듈 시스템

모듈(module)은 어플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각을 의미한다.
보통 모듈은 기능을 기준으로 파일 단위로 분리한다. 이때 모듈이 성립하려면 모듈은 자신만의 파일 스코프(모듈 스코프)를 가질 수 있어야 한다.
자신만의 파일 스코프를 갖는 모듈의 모든 자산(변수, 함수 등)은 기본적으로 비공개 상태이다.
즉, 캡슐화가 되어있어서 다른 모듈에서 접근할 수 없다.
모듈은 개별적인 존재로서 애플리케이션과 분리되어 존재한다.

하지만 애플리케이션에서 사용할 수 없는 모듈은 의미가 없기 때문에,
모듈은 공개가 필요한 자산에 한정하여 명시적으로 선택적 공개가 가능하다. === `export` 라고 한다.
이렇게 공개(export)한 모듈의 자산은 다른 모듈에서 재사용 할 수 있고
모듈 사용자는 모듈이 공개한 자산 중 일부 또는 전체를 선택해 자신의 스코프 내로 불러들여 재사용 할수 있다. === `import` 라고 한다.

과거 Javascript 환경에서는 모듈 시스템이 존재하지 않았다.
script 태그로 분리하여 사용해도 결국은 하나의 Javascript 파일 내부에서 동작하는 것 처럼 실행되었다.
이떄 제시된 모듈 시스템이 `CommonJS, AMD` 이다.
Node.js는 사실상 표준이였던 `CommonJS`를 채택했다.

이런 상황에서 ES6에서는 클라이언트 사이드 Javascript에서도 동작하는 모듈 기능을 추가했다. === `ESM`
`script`태그에 `type="module"` 어트리뷰트를 추가하면 로드된 Javascript 파일은 모듈로서 동작한다.

Javasript에서 모듈 시스템은 크게 4가지로 나눌 수 있다.

1. ESM
2. CommonJS
3. AMD
4. UMD

### ESM

요즘 [`Pure ESM`](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) 을 지원하는 디펜던시가 많아졌다.
CommonJS, ESM 둘 다 지원할 수 있지만 굳이 ESM만을 지원하겠다 라는 선언인데, 클리이언트 사이드 Javascript는 ES6를 지원하니 상관없지만 CommonJS로 동작하는 Node.js 환경은 말이 다르다.
CJS와 ESM은 모듈 import/export 과정부터 다르다.
ESM은 비동기로 이루어 지고 CJS는 동기적으로 이루어지는데, 이런 이유 때문에 일반적인 방법으로는 `CJS`에서 `ESM` 모듈을 불러 올 수 없다.
CJS에서 `dynamic import` 로 파일을 불러오거나 `ESM`프로젝트로 변환해야한다.

회사 프로젝트에 typescript가 도입될 걸 고려해서 CJS &rarr; ESM 으로 변경하려고 시도했는데, 레거시가 많고 CJS 프로젝트에서 `global`이나 `__path` `__dirname` 처럼 ESM에서 지원하지 않는 기능을 많이 사용했고, 덩치가 너무 커서 변환을 시도하다 멈췄다.

- [CommonJS와 ES Modules은 왜 함께 할 수 없는가?](https://yceffort.kr/2020/08/commonjs-esmodules)
  - 변역글인데, 이 글에서는 CJS가 향후 Javascript의 미래가 될 거라 판단했다.

### AMD(Asynchronous Module Definition)

브라우저단에서 사용하는 비동기 모듈 시스템.
과거 CommonJS는 동기적인 모듈 시스템을 추구했다면 AMD는 브라우저에서 사용되기 위한 비동기로 동작하는 모듈 시스템을 고민했다.
브라우저에서는 동기적으로 모듈을 다운받게 되면 모듈이 모두 다운로드 받아질 때 까지 기다려야 하기 때문에 비동기 모듈 시스템이 필요했는데, 안타깝게 표준이 되지는 못했다.

### CommonJS

Javascript에 모듈화를 도입했던 선두주자.
`모듈`은 위에서 말했다시피 다른 모듈이 접근할 수 없는 자신만의 독립적인 영역(`Scope`)을 가지는게 중요하다. 또한 선택적으로 외부에 공개(`export`) 할 수 있어야 하고 다른 모듈을 가져올 수 있어야 한다.(`import`)
CommonJS는 이런 조건을 모두 만족했고 Node.js의 기본값으로 채택되었으나,
ES Modules은 Javascript의 표준이 되었다.

---

- [CommonJS vs. ES modules in Node.js](https://blog.logrocket.com/commonjs-vs-es-modules-node-js/)
  - Node.js version 9 이하에서는 ESM이 지원되지 않는걸 고려해야한다.
  - Node.js의 기본값은 CommonJS이고 Javascript의 표준은 ESM이기 때문에 둘 다 유용하다. 하지만 CommonJS 프로젝트를 ESM으로 마이그레이션하는건 좋은 선택이 아닐 수 있다.
  - ESM이 Javascript의 미래다.

ESM과 CJS를 두고 벌이는 논쟁은 정말 많다. Pure ESM의 댓글만 봐도 수많은 의견들을 주고받는걸 볼 수 있다.
하지만 Pure ESM에 대한 방향성도 그렇고 CommonJS 보다 ESM으로 흘러가는 것 같다.
ESM은 CJS를 수용할 수 있으나 CJS는 ESM을 수용하기 까다롭기 때문이다.

### UMD

과거 AMD, CommonJS 가 서로 쓰이던 때에, 문제는 두가지 모듈 시스템을 사용한다는 것이였다.
따라서 CommonJS와 AMD가 공통되는 방식으로 동작하면 편리할거라 느끼고 두가지 모듈 시스템중 어떤걸 사용해도 문제가 없도록 UMD가 등장했다.
모듈 시스템이라기 보다는 디자인 패턴에 가깝다.

_**이해를 돕기위해 [ZeroCho - AMD, CommonJS, UMD 모듈](https://www.zerocho.com/category/JavaScript/post/5b67e7847bbbd3001b43fd73)의 UMD 코드를 가져왔습니다.**_

```js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['jquery', 'zerocho'], factory);
  } else if (typeof module === 'object' && module.exports) { // CommonJS
    module.exports = factory(require('jquery'), require('zerocho'));
  } else { // window
    root.myModule = factory(root.$, root.Z);
  }
}(this, function($, Z) {
  return {
    a: $,
    b: Z,
  };
});
```

## 참고

- [[JavaScript] CJS, AMD, UMD, ESM](https://beomy.github.io/tech/javascript/cjs-amd-umd-esm/)
- [ZeroCho - AMD, CommonJS, UMD 모듈](https://www.zerocho.com/category/JavaScript/post/5b67e7847bbbd3001b43fd73)
