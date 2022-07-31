---
title: "프로토타입(prototype)이 무엇인가요?"
date: "2022-07-31T03:44:25.239Z"
description: Javascript에서 프로토타입은 무엇인가요?
tags:
  - Javascript
---

![small](http://image.yes24.com/goods/92742567/XL)

**`모던 자바스크립트 Deep Dive` 책을 공부하면서 정리했습니다.**

## 왜 Javascript에서는 프로토타입을 사용하는가?

Javascript는 명령형, 함수형, 프로토타입 기반, 객체지향 프로그래밍을 지원하는 멀티 페러다임 언어이다.
`객체지향`은 실세계의 실체(사물, 개념)을 인식하는 철학적 사고를 프로그래밍에 접합하려는 시도에서 시작했다.
사람은 이름, 주소, 신발사이즈, 키, 몸무게 등 수많은 정보를 가지고 있지만, 프로그래밍에서 사용되는 데이터만 뽑아 정의한걸 `추상화(abstract)` 라고 한다.

```Javascript
const person = {
  name : 'ddingg',
  address: 'seoul'
}
```

또한 `상속`은 객체지향 프로그래밍의 핵심 개념으로 코드를 재사용 함으로써 불필요한 중복을 제거하는게 의미가 있다.

Javascript에서 상속은 `prototype`을 이용해서 구현한다.

```js
function Circle(radius) {
  this.radius = radius
}

Circle.prototype.getArea = function () {
  return Math.PI * this.radius * 2
}

const c1 = new Circle(1)
const c2 = new Circle(2)

console.log(c1.getArea === c2.getArea) // true

console.log(c1.getArea() === c2.getArea()) // false
```

위에서 본 것 처럼 c1, c2의 `getArea` 함수는 prototype으로 만들어진 상속받은 객체이기 때문에 같은 값 이라고 판별한다. (상속에 의한 메서드 공유)

---

## 프로토타입은 무엇인가?

자 이제 `prototype` 객체에 대해 살펴보자.
프로토타입 객체는 객체간 상속을 구현하기 위해 사용된다.
즉 상속받은 자식 객체는 부모 객체의 `property`를 자유롭게 사용할 수 있다.

모든 객체는 `[[Prototype]]` 이라는 내부 슬롯을 가진다.
여기에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다.

예를들어 객체 리터럴로 생성된 객체는 `Object.prototype`을 가지고 있다고 하지만, 생성자 함수에 의해 생성된 객체는 생성자 함수의 `prototype` 프로퍼티에 바인딩 되어 있는 객체이다.

```js
// 객체 리터럴
const Person = {
  name: "ddingg",
  address: "seoul",
}

// 생성자 함수
function Person(name, address) {
  this.name = name
  this.address = address
}
```

`[[Prototype]]` 내부 슬롯에는 직접 접근할 수 없지만 `__proto__` 접근자 프로퍼티로 할당된 `prototype`에 접근할 수 있다.
이건 객체가 직접 소유하는 프로퍼티가 아니라 `Object.prototype`의 프로퍼티이다.

```js
const obj = {}
const parent = { name: "ddingg" }

obj.__proto__ = parent
console.log(obj.name) // ddingg
```

왜 굳이?? `__proto__`를 사용해서 prototype 에 접근하고 할당하는 방법을 알아야할까?
상호 참조에 의해 프로토타입 체인이 생성되는걸 방지하기 위해서 이다.

```js
const parent = {}
const child = {}

// BAD : 상호참조
child.__proto__ = parent
parent.__proto__ = child
```

프로토타입 체인은 linked list. 즉 단방향으로 구현되어야 한다.
따라서 아무런 체크없이 무조건 적으로 프로토타입을 교체할 수 없도록 `__proto__` 를 사용해 접근하고 교체하도록 하는 것이다.

함수 객체는 생성자 함수가 존재하기 때문에 prototype을 갖지만 arrow-function의 경우는 생성자 함수가 존재하지 않기 떄문에 prototype을 갖지 않는다. (익명 함수의 경우는 생성자 함수를 갖는다.)
즉, `생성자(constructor)`와 `프로토타입`은 항상 쌍으로 존재한다.

```js
// 객체 리터럴
const obj = {}

//함수 리터럴
const add = function (a, b) {
  return a + b
}

// 배열 리터럴
const arr = [1, 2, 3]

//정규 표현식 리터럴
const regex = /is/gi
```

위 리터럴 표기법에 의해 생성된 객체도 prototype이 존재한다.

---

## 프로토타입 생성 시점

사용자 프로토타입은 constructor 함수 정의가 평가되어 객체를 생성하는 시점에 생성된다.

```js
console.log(Person.prototype) // [constructor: f]

function Person(name) {
  this.name = name
}
```

빌트인 생성자 함수 (Object, String, Number, Array, Function, RegExp, Date, Promise 등등..)도 마찬가지로 생성자 함수가 생성되는 시점에 프로토타입이 생기는데, 모든 빌트인 함수는 전역 객체가 생성되는 시점에 생성된다.
전역 객체는 코드가 실행되기 전 Javascript 엔진에 의해 생성된다.

## 프로토타입 체인

Javascript 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 `[[Prototype]]` 내부 슬롯의 참조를 따라 부모 프로토타입의 프로퍼티를 순차적으로 탐색한다.
이를 프로토타입 체인이라고 하고 Javascript가 상속을 구현하는 방법이다.
최상위는 언제나 `Object.prototype` 이고 여기 `[[Prototype]]` 슬롯은 항상 null이다.

## 오버라이딩과 프로퍼티 섀도잉

```js
function Person(name) {
  this.name = name
}

Person.property.sayHello = function () {
  console.log("Hi Persion!", this.name)
}

const me = new Person("ddingg")

me.sayHello = function () {
  console.log("Hi Me!", this.name)
}

me.sayHello() // Hi Me! ddingg
```

이런식으로 부모 객체의 함수와 같은 이름으로 자식에서 함수를 만들게 되면
자식에서 선언한 함수가 프로토타입 체인에 따라 먼저 검색되고 호출된다.
따라서 부모의 프로퍼티는 가려지는 것 처럼 보이는데 이걸 `프로퍼티 섀도잉` 이라고 한다.

오버라이딩은 이런 방식으로 구현되는데, Javascript에서는 매개변수에 따라 함수 호출이 변하지는 않기 때문에 `arguments` 를 사용해서 오버로딩처럼 동작하도록 만들 수 있다.

## instanceof

`instanceof` 연산자는 프로토타입의 생성자 함수를 프로토타입 체인에 따라 검색하면서 존재하는지 확인한다. 함수로 표현하면 아래와 같다.

```js
function isInstanceof(instance, constructor) {
  const prototype = Object.getPropertyOf(instance)

  // prototype chain end
  if (prototype === null) return false

  return prototype === constructor || isInstanceof(prototype, constructor)
}
```

## for...in

객체의 `프로퍼티` 를 열거할 때 사용한다.
프로토타입 체인 상에 존재하는 모든 프로토타입 프로퍼티 중 `[[Enumerable]]`의 값이 `true`인 프로퍼티를 열거한다.

```js
const person = {
  name: "ddingg",
  address: "seoul",
}

for (const key in person) {
  /**
   * name : ddingg
   * address : seoul
   */
  console.log(key, " : ", person[key])
}
```

`for...of` 와 다른점은 `for...of`는 객체 iterator만 평가하며 iterator의 `value`를 가져오고 `for...in`은 모든 객체를 평가하지만 `key`를 가져온다.

`[...values]` &rarr; `for...of`, `Object.values`
`[...keys]` &rarr; `for...in`, `Object.keys`
`[[...keys], [...values]]` &rarr; `Object.entries`
