---
title: "클로저(Closure)가 무엇인가요"
published: 2022-07-25T08:35:53.565Z
description: 클로저(Closure)가 무엇인가요?
category: 무엇인가요 시리즈
draft: false
tags:
  - Javascript
---

## 정의

> 컴퓨터 언어에서 클로저(Closure)는 일급 객체 함수(first-class functions)의 개념을 이용하여 스코프(scope)에 묶인 변수를 바인딩 하기 위한 일종의 기술이다. 기능상으로, 클로저는 함수를 저장한 레코드(record)이며, 스코프(scope)의 인수(Factor)들은 클로저가 만들어질 때 정의(define)되며, 스코프 내의 영역이 소멸(remove)되었어도 그에 대한 접근(access)은 독립된 복사본인 클로저를 통해 이루어질 수 있다.

클로저는 Javascript의 고유 개념이 아니다.
MDN에서는 **`클로저는 함수와 함수가 선언된 어휘적 환경의 조합이다.`** 라고 정의하고 있다.
아래 예제를 보자

```Javascript
const x = 1;

function outerFunction(){
  const x = 10;

  function innerFunction(){
    console.log(x);
  }

  return innerFunction;
}

const innerFn = outerFunction();
innerFn(); // 10
```

왜 `10`이 출력될까?
이건 Javascript가 `렉시컬 스코프` 를 따르고 있기 때문이다.
[프로토타입이 무엇인가요?](<../프로토타입(prototype)이%20무엇인가요/index.md>) 를 살펴보면 프로퍼티를 탐색할때 prototype에 정의된 프로퍼티를 탐색하면서 부모 객체로 올라간다는걸 알 수 있다.
그렇다면 여기서 innerFunction의 프로토타입은 `outerFunction`일까?
아니다. `innerFunction`는 상속받지 않았고 `outerFunction`의 내부 함수일 뿐이다.
그렇다면 `outerFunction`에 선언된 `x`는 어떻게 찾은 것 일까?

함수 생명주기를 고려해서 실행되는 순서를 생각해보자.

1. `outerFunction`이 선언된다.
2. `outerFunction`이 실행된다.
3. `outerFunction`가 완료되면서 innerFunciton을 반환하고 `outerFunction`의 생명주기가 끝난다.
4. `innerFunction` 을 저장하고 실행한다.
5. 10이 출력된다.

이미 `outerFunction`의 생명주기가 끝난 시점에서 `x`도 같이 생명주기를 마감한다. 하지만 실행 결과는 `outerFunction`의 `x`값인 10이 출력된다.

이처럼 외부 함수(outerFunction)보다 중첩 함수(innerFunction)가 더 오래 유지되는 경우, 이미 생명주기가 종료된 외부 함수의 변수를 참조할 수 있다.
**`이러한 중첩 함수를 클로저(Closure) 라고 부른다.`**

![innerFnDebug.png](/images/innerFnDebug.png)

디버거의 `[[Scopes]]` 부분을 보면 `Closure` &rarr; `Script` &rarr; `Global` 순으로 나열된 걸 볼 수 있다.

---

## 함수 객체의 내부 슬롯 `[[Enviroment]]`

자 그렇다면 우리는 렉시컬 스코프를 가진 클로저가 이미 생명주기가 끝난 상위 스코프의 변수를 참조할 수 있다는걸 알았다.

어떻게 이게 가능한걸까? 생명주기가 끝났음에도 GC에 의해 메모리가 초기화되어야 하는게 아닌가?

그렇지않다.

GC에 의해 메모리에서 정리되지 않는 이유는 `innerFunction`(클로저)에서 자신이 정의된 `outerFunction`(상위 스코프)를 기억하고 있기 때문이다.

**함수는 이 정보를 자신의 내부 슬롯 `[[Enviroment]]`에 자신이 정의된 환경을 저장한다.**

또한 "생명주기가 끝났다." 라는건 실행 컨텍스트 스택에서 제거된다는 뜻이다.

실행 컨텍스트에서 제거가 되는건 맞지만 클로저 함수의 `[[Enviroment]]` 에 저장된 상위 스코프의 렉시컬 환경까지 소멸하는 것은 아니다.

따라서 아직 클로저 `innterFunction`에 의해 `outerFunction`는 참조받고 있기 때문에 GC는 `outerFunction`의 생명주기가 끝나도 메모리에서 해제하지 않는다.

---

## 결론

그렇다면 함수 안에 함수가 선언된 모든 함수를 우리는 클로저라고 불러야 할까?

그렇게 되면 이론상 모든 함수는 클로저가 된다.

답은 `모든 함수가 클로저는 아니다.` 이다.

다시 MDN의 정의로 돌아가보면 **`클로저는 함수와 함수가 선언된 어휘적 환경의 조합이다.`** 라는 문구에서 우리는 _"어휘적 환경의 **`조합`**"_ 에 초점을 맞춰야한다.

즉 상위 스코프 함수의 프로퍼티를 참조하지 않으면 우리는 클로저라고 부르지 않는다.

```js
const a = 1

function foo() {
  const b = 2

  function bar() {
    const c = 3

    return c
  }

  return bar
}

const fn = foo()

fn() // 3
```

여기 예제에서 `foo` 함수는 `bar` 함수를 리턴한다.
하지만 `bar` 함수에서는 상위 스코프인 `foo` 함수의 어떤 프로퍼티도 참조하고 있지 않기 때문에 `bar` 함수는 클로저가 아니다.
GC는 생명주기가 끝났고 어떤 참조도 받지 않는 `foo` 함수를 메모리에서 해제한다.

## 활용

```js
const increase = (function () {
  let num = 0

  return function () {
    return ++num
  }
})()

console.log(increase()) // 1
console.log(increase()) // 2
console.log(increase()) // 3
```

상태값 `num` 을 외부에 노출시키지 않으면서 안전하게 값을 변경한다.

**이런식으로 상태가 의도치한게 변경되지 않도록 안전하게 은닉하고 특정 함수에게만 상태 병경을 허용하여 상태를 안전하게 변경, 유지하기 위해 사용한다.**

하지만 부모 함수에서 사용하고 있는 데이터는 GC에 의해 정리되지 않기 때문에 메모리를 차지한다는 단점과
스코프에 따른 퍼포먼스 손해?

React에서 클로저가 사용되는 경우 -> react hook에서 사용되고 있다.
왜 React hook에서 클로저를 사용해야 하는가?
