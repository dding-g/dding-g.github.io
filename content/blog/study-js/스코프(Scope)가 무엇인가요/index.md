---
title: "스코프(Scope)가 무엇인가요?"
date: "2022-07-29T11:49:11.850Z"
description: <설명>
tags:
  - 태그1
  - 태그2
---

## 정의

스코프(Scope). 직역하면 "범위"이다. 즉 변수에 접근할 수 있는 범위 라고 볼 수 있다.
Javascript에서는 global(전역)과 local(지역). 두가지 스코프가 존재한다.

대부분 C-family language 는 `블록 레벨 스코프`를 따른다.

```c
int main(void) {
  // block-level scope
  if (1) {
    int x = 5;
    printf("x = %d\n", x);
  }

  printf("x = %d\n", x); // use of undeclared identifier 'x'

  return 0;
}
```

하지만 Javascript는 `함수 레벨 스코프` 를 따른다.
이는 블록 내에서 선언된 변수는 함수 코드 블록 내에서만 유효하고, 함수 외부에서는 유효하지 않는걸 의미한다.
단 `let / const` 는 블록레벨 스코프가 적용된다. -> 이게 어떻게 가능한가? -> 실행 컨텍스트에서 스코프 체인으로 관리한다.

```js
var x = 0
{
  var x = 1
  console.log(x) // 1
}
console.log(x) // 1

let y = 0
{
  let y = 1
  console.log(y) // 1
}
console.log(y) // 0
```

## 렉시컬 스코프

```js
var x = 1

function foo() {
  var x = 10
  bar()
}

function bar() {
  console.log(x)
}

foo() // ?
bar() // ?
```

위 예제에서 함수 `bar`의 상위 스코프가 무엇인가에 따라 결과가 바뀐다.
우리는 두가지 방법을 추측할 수 있는데

1. 함수를 어디서 호출하였는가에 따름
2. 함수를 어디서 선언했는가에 따름
   위 방법중 하나를 따라 상위 스코프가 결정된다.

우리는 첫번째 방식을 동적 스코프(Dynamic Scope)라고 하고 두번쨰 방식을 렉시컬 스코프(Lexical Scope), 정적 스코프(Static Scope)라고 한다.
Javascript는 렉시컬 스코프를 따른다.
