---
title: "Immer가 무엇인가요"
date: "2022-08-17T07:29:46.468Z"
description: 불변성을 관리해주는 Immer 오픈소스를 살펴보는 글
tags:
  - React
  - 불변셩(immutable)
---

> Immer : 독일어로 Always(항상)이라는 뜻.

immer는 항상 불변성(immutable)을 유지할 수 있도록 관리해주는 오픈소스 라이브러리 입니다.
React에 국한되지않고 Javascript의 **_변경할 수 없는 데이터 구조_**를 사용해야하는 모든 곳에서 사용할 수 있습니다.

## 불변성(Immutable)

저기 **_변경할 수 없는 데이터 구조_** 가 무엇인가를 먼저 살펴봅시다.
Javascript는 변경할 수 없는 원시값 이라는게 존재합니다.
예를들어 `let`을 사용해서 데이터를 저장하고 변경한다는걸 생각해봅시다.

```js
let data = "DATA 입니다." // 1

data = "변경된 DATA 입니다." // 2

console.log(data) // 변경된 DATA 입니다.
```

첫번째 `data`에 값이 할당되는 과정을 살펴봅시다.
변수 호이스팅 과정을 보면 알 수 있습니다.
`data`는 Javascript의 초기화 단계에서 값이 할당됩니다. (선언단계 X)

1. `"DATA 입니다."` 라는 문자열을 메모리에 저장합니다.
2. 위 문자열이 저장된 주소를 `data` 변수에 할당합니다.
3. `"변경된 DATA 입니다"` 라는 문자열을 메모리에 저장합니다.
4. 변경된 문자열이 저장된 메모리 주소를 `data` 변수에 재할당합니다.

다음 예제를 살펴봅시다.
Javascript에서 문자열은 배열로 저장됩니다.
이때 직접 해당 index의 문자열로 접근해서 값을 바꾸려고 하면 어떻게 될까요?

```js
let data = "DATA 입니다." // 1

data[0] = "A" // 2

console.log(data) // DATA 입니다.
```

첫번째 글자를 `A`로 바꾸었으나 `AATA 입니다.`라고 출력되지 않고 기존 값이 그대로 출력되었습니다.

왜냐하면 Javascript에서 원시값은 불변성(immutable)을 보장하기 때문입니다.
한번 할당된 원시값은 메모리에 직접 접근해서 해당 값을 변경할 수 없습니다.
새로운 메모리에 값을 할당하고 해당 메모리 주소를 참조하도록 해야합니다.

> 원시값을 가지는 자료형은 아래와 같습니다.
> _string, number, bigint, boolean, undefined, symbol, null_

그렇다면 변경할 수 없는 `const`에 할당된 객체는 어떨까요?

`const` 선언은 변수에 저장된 값을 변경 할 수 없도록 "읽기 전용"으로 만듭니다.

```js
const obj = {
  name: "홍길동",
  age: 20,
}

console.log(obj) // 홍길동, 20

obj.name = "dding-g"
obj.age = 27

conosle.log(obj) // dding-g, 27
```

`obj` 변수를 `const`로 선언해서 읽기 전용으로 만들었지만, 객체 내부의 프로퍼티는 변경할 수 있습니다.
단, 원시타입을 가지는 내부 프로퍼티는 동일하게 불변성이 적용되므로, 위에서 설명한 원시값과 동일하게 동작합니다.

왜냐하면 `객체(object)`는 원시타입이 아니기 때문입니다.
그렇기 때문에 내부에 할당된 프로퍼티를 자유롭게 추가, 삭제, 수정 할 수 있습니다.
객체가 변경될 떄 마다 새로운 메모리에 객체 전체를 다시 저장하고 변수에 저장된 주소를 옮기는 건 비용이 많이 들기때문에
메모리의 호율성을 위해 이렇게 설계되었다고 볼 수 있습니다.

![obj 메모리 주소](/images/obj_memory.jpeg)

## 그렇다면 Immer를 왜 써야하나요?

다시 돌아와서 `Immer`는 왜 이런 불변성을 가지는 데이터를 다시 할당할 수 있게 만들었을까요?

위에서 살펴본 불변성을 기반으로 **_변경할 수 없는 데이터 구조_** 가 무엇을 의미하는지 유추해봅시다.

[Immer의 공식 Document에 있는 예제](https://immerjs.github.io/immer/#a-quick-example-for-comparison)를 잠시 살펴봅시다.

```js
const baseState = [
  {
    title: "Learn TypeScript",
    done: true,
  },
  {
    title: "Try Immer",
    done: false,
  },
]
```

위 객체를 복사해서 다른 변수에 할당한다고 했을 때 우리는 두 가지 방법을 사용할 수 있습니다.

1. 얕은 복사
2. 깊은 복사

얕은 복사는 객체 내부 프로퍼티를 새로 만들지 않고 기존 값의 메모리값을 참조해서 복사하는걸 얕은 복사 라고 하고,
깊은 복사는 값 자체를 복사해서 새로운 메모리에 할당하는걸 의미하죠.

코드로 표현하면 아래와 같습니다.

```js
const shallowCopyState = baseState // 얕은 복사

// 깊은 복사
const deepCopyState = baseState.map(state => ({ ...state }))
```

Javascript에서 객체를 깊은 복사 하는 방법은 여러가지가 있습니다.

1. Spread 연산자 사용하기
2. `JSON.Stringify()` 함수로 문자열로 변환했다가 다시 `JSON.parse()`로 객체로 만들기
3. 재귀적으로 객체 내부를 돌면서 데이터를 새로 할당하기

위에서는 1번과 3번을 혼합해서 깊은 복사를 했다고 볼 수 있습니다.

의도적으로 같은 값을 가진 새로운 객체를 생성해야한다면 깊은 복사를 하는건 문제가 없습니다.
하지만 불변성을 가진 객체를 새로 할당해야하는 경우, 문제가 발생합니다.

위에서 Javascript 엔진이 객체를 원시값으로 지정하지 않은 이유는,
객체가 수정될 떄 마다 새로운 객체를 메모리에 할당하는 작업은 **_너무나도 비용이 비싸다!_** 라고 했습니다.

React는 `setState`가 호출되었을 경우 re-rendering을 예약합니다.
데이터가 변경되었으니 Virtual DOM을 새로 만들어서 변경점을 파악하고 변경된 부분을 렌더링하는 과정이 필요하기 때문이죠.
변경된 데이터로 화면을 바꿔줘야 한다는 겁니다.

원시타입을 가진 `state`라면 문제없습니다.
단일 데이터를 새로운 메모리에 할당하고 변경하는건 비용이 크게 비싸지 않으니까요.

객체는 얼마나 커질지 장담할 수 없기 때문에 그 비용을 가늠할 수 없죠.
하지만 객체 내부 프로퍼티를 변경하고 re-rendering을 시키려면 새로운 객체를 `setState`함수를 이용해서 할당해줄 수 밖에 없습니다.

이때! 우리의 `Immer`가 등장하게 됩니다.
![Immer image](https://immerjs.github.io/immer/assets/images/immer-4002b3fd2cfd3aa66c62ecc525663c0d.png)

[How Immer works](https://immerjs.github.io/immer/#how-immer-works)에서 발췌한 사진입니다.

위에서 말했던 **_변경할 수 없는 데이터 구조_**는 React의 State처럼 객체에 직접 접근해서 값을 변경하는게 아닌 항상 **새로운 객체를 만들어야 하는 경우**를 말합니다.

`Immer`는 그림에서 보는 것 처럼 변경되지 않은 값은 그대로 유지하고 (Structure sharing) 변경된 값만 작업해서 새로운 객체를 생성합니다.
Immer가 동작하는 원리를 너무 너무 잘 설명한 글이 [여기](https://hmos.dev/deep-dive-to-immer)있기 때문에 살펴보지는 않고 간단하게만 요약하고 넘어가겠습니다.

1. 기존 객체를 얕은 복사로 `copy_` 객체를 만든다. 기존 객체는 `base_`으로 유지한다.
2. 변경된 값은 `copy_` 객체에 업데이트한다.
3. `base_`와 `copy_` 객체를 비교하면서 어떤 값이 변경되었는지 Structure share를 사용해서 비교하고 새로운 객체를 만들어 리턴한다.
   - 어떤게 업데이트 되었는지는 등록되어 있는 `Proxy` 객체를 통해서 이미 체크가 되어있기 때문에 `modified_` flag를 보고 판단한다.

따라서 새로운 객체가 리턴되는건 맞지만, 변경된 데이터만 메모리에 반영되고 기존 데이터는 계속 사용하기 때문에 성능상 이점을 가져갈 수 있게 됩니다.

---

참고 링크

- [Immer document](https://immerjs.github.io/immer/)
- [Immer 내부 살펴보기](https://hmos.dev/deep-dive-to-immer)
- Javascript Deep Dive 책
