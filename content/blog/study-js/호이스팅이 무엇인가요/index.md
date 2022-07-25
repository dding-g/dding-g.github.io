---
title: "호이스팅이 무엇인가요"
date: "2022-07-24T12:47:39.482Z"
description: Javascript의 호이스팅에 대한 글
tags:
  - Javascript
---

## 정의

호이스팅이란 인터프리터가 변수와 함수의 메모리 공간을 선언전에 미리 할당하는걸 의미한다. === 변수, 함수 "자리"를 메모리에 먼저 만든 것.
Javascript에서는 모든 선언 (var, let, const, function, function\* class)를 호이스팅한다.

## var

`var` 로 선언한 변수의 경우 호이스팅시 `undefined`로 변수를 초기화 한다. 즉, 선언과 초기화 과정이 동시에 이뤄진다.
반면 `let` `const`로 선언한 변수의 경우 호이스팅 시 변수를 초기화하지 않는다.

Javascript는 초기화를 제외한 **선언만** 호이스팅한다.
`var`선언시 `undefined`, 그 외는 초기화하지 않는다.

```js
conosle.log(num) // 호이스팅한 var 선언으로 인해 undefined 출력
var num // 선언
num = 6 // 초기화
```

```js
conosle.log(num) // Reference Error : 존재하지 않는 병수 참조
num = 6 // 전역변수 초기화
```

## let, const

`let/const`로 선언한 변수도 호이스팅이 이뤄지지만, `var`와 달리 호이스팅시 `undefined`로 변수를 초기화하지는 않는다.
`let/const`는 `Temporal Dead Zone(TDZ)`에 의해 제약을 받는다.

`TDZ`

- 일시적 사각지대
- 선언과 초기화 단계 사이에 위치

`TDZ`는 선언단계와 초기화 단계 사이에 있는데 `var`는 선언과 초기화가 같은 단계에서 실행되지만 `let`는 선언 다음 초기화가 실행된다.
따라서 선언 전에 변수를 호출하게 되면 `TDZ` 빠져 `Reference Error`를 뿜게 된다.
`const`는 선언과 초기화가 동시에 진행되지만, 선언 이전에 `TDZ`가 생성되어 변수를 호출하게 되면 `Reference Error`를 뿜게 된다.

재미있는건 `typeof` 에서 호이스팅된 변수를 호출할때다.
아래 `notDefined` 변수는 정의되지 않았다.

```js
typeof notDefined // undefined
```

하지만 아래 호이스팅된 변수의 결과는

```js
typeof variable // Reference Error
let variable
```

`Reference Error`를 뿜는다.

`let`으로 선언한 `variable`은 그 직후 `not initialize` 상태를 갖고 아직 `undefined`로 초기화가 되기 전이다.
`let/const`는 선언후에 아직 초기화가 되기 전 단계이기 때문에 `TDZ`에서 동작했다고 보는것이다.

## 함수 호이스팅


---

참고

- [https://poiemaweb.com/es6-block-scope](https://poiemaweb.com/es6-block-scope)
- [https://ui.toast.com/weekly-pick/ko_20191014](https://ui.toast.com/weekly-pick/ko_20191014)
