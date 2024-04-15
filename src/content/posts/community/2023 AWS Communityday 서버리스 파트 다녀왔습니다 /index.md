---
title: "2023 AWS Communityday 서버리스 파트 다녀왔습니다 "
published: 2023-10-29T18:27:56.683Z
description: Serverless의 중요성, 활용성 들에 대해서 알 수 있는 좋은 기회였습니다.
category: 커뮤니티
tags:
  - Serverless
  - AWS
  - 세미나
---

## Session 1

AWS Community day 시작 발표

- 개발자 경험의 다음 세대 : 모던 어플리케이션을 어떻게 만들 수 있을까?
- AI가 사람을 대체할 수는 없지만, AI를 다루는 사람이 AI를 다루지 않는 사람을 대체하게 될 것 이다.
- AWS Lambda powertools
- 스크래치 처럼 GUI를 사용한 인프라 구조 설계가 가능해짐
  - Amazon Bedrock
  - 대체로 No-code, servereless에 초점이 맞춰저있나봄
- Fargate
  - 컨테이너용 서버리스 컴퓨팅 엔진
- AWS Copilot -> CLI랑 뭐가다르지..?
- 마지막 10분정도 설명하는거 한번 더 유튜브에 올라오면 볼만 할 듯. 여기서는 잘 안들리고 뭐라하는지 잘 이해를 못했음. AWS Copilot이 되게 신기한거같음

## Session2

> 모던 프론트엔드 개발자가 꼭 알아야할 서버리스 서비스들
> Granter - 윤창현

1. Modern Web Application
   - CSR -> SSR 로 트랜드가 바뀌면서 서버의 역할이 더 커졌다
   - micro architecture
   - serverless
     - 개발자가 서비스의 비즈니스로직만 작성해도 될 정도로, 서버를 관리할 필요가 없도록.
2. AWS Amplify
   - 정량적으로 얼마나 사용자가 사용할 지 모를 떄 사용
   - 간단하게 웹 호스팅도 가능
   - 풀스택 앱을 빠르게 만들기 좋은 스택임
   - 적은 리소스로 MVP 개발하기 좋음.
   - 피그마를 react 코드로 변환 가능
   - https://docs.amplify.aws/console/
   - figma - amplify-ui -> 사업 검증용 MVP 같은거 만들때 사용함.
     - 반응형같은거는 바라지마라
3. AWS Lambda
   1. 요청 발생 후 코드 실행하고 컨테이너를 실행함
      1. 이걸 cold start 라고 하고, 이 시간을 단축시키는게 중요함
         1. java가 이 시간이 되게 길기 때문에 얼마 전에 snapshot을 따서 실행시키는 기능을 지원함. (6s -> 0.144s ) 까지 줄어듬
         2. node는 애초에 빨라서 지원 안함
   2. 대규모 함수 호출에서 가장 효과적이다.
4. AWS API Gateway
   1. micro architecture 가 트랜트가 되면서 뜨는 서비스임.
   2. client -> server 에서 client -> api gateway
   3. api gateway pattern 을 한번 공부해볼 필요가 있을 듯.

> 요약: CSR -> SSR로 변경됨에 따라 Server의 비중이 크게 늘었고, 안정적인 배포 및 운영도 FE에서 신경 쓸 때가 왔다.

## Session 3

> 썜(SAM)! 도와주세요! Serverless Application Model
> 당근 internal platform

어떻게 로컬에서 AWS Lambda 를 테스트 해볼 수 있을까?

- LocalStack 으로 S3도 로컬에서 실행시켜볼 수 있다..?

프로젝트 진행 예시 https://github.com/0417taehyun/help-me-sam

- 영상 이미지 업로드
  - API gateway -> lambda -> s3 presigned url 업로드 (기존)
  - SAM -> lambda -> s3 presigned url (SAM을 이용한 local)
- 영상과 이미지 업로드는
  - lambda -> payload size 6MB가 한계
    - 6MB보다 큰 파일인 경우 S3 presigned url 사용하기
  - API Gateway는 10MB가 한계

> 요약: 영상과 이미지 업로드를 서버를 거치지 않고 API gateway -> lambda -> s3 업로드를 거친다.
> lambda, API Gateway의 payload body에는 max-size가 걸려있기 때문에 SAM을 이용해 이러한 단점들을 극복한다.

## Session 4

> 서버리스에서의 부하 테스트와 필요상
> serverless.co.jp 대표

비용 최적화를 위함
정량적인 데이터로 아키텍쳐 등을 수정해야 한다면 부하 테스트로 정량적 수치를 뽑을 수 있음
기존 Amplify로 되어있던 일본의 대규모 방송국 서비스를 serverless로 마이그레이션함.
dynamoDB -> momento 로 변경한 이유

- AppSync 를 경유해서 데이터를 가져와야 했는데, 시간이 부족했기 때문에 momento에 캐싱으로 일단 올리고 나중에 수정하도록 했음

> 요약: 인프라 엔지니어링에 대한 내용들이라 잘 이해를 못했지만,
> 정량적인 수치로 스케일 업 또는 구조를 변경하기 위해 회사에 요청할 떄, 숫자로 증명할 수 있는 가장 확실한 방법은 부하테스트이다.
> 서버리스 부하테스트는 lambda, dynamodb, API Gateway 등 다양한 시도가 필요하다.

---

## Session 5

> AWS EvnetBridge를 활용한 event-driven 아키텍쳐 설계
> 라콘랩스 - 박상운

- Event Driven 아키텍쳐
  - 이미지가 S3에 올라갔을 떄 올라가는 이벤트를 잡아서 썸네일 제작 등
- Amazon Event Bridge
  - 이벤트가 발생했을 떄 적절한 곳에 이벤트를 라우팅함.
  - 이벤트 라우팅
  - 이벤트 버스
  - 이벤트 규칙 패턴
    - EC2 생성 같은 이벤트받아서 중지하기 등
  - 이벤트 파이프
  - 무언가를 주기적으로 해야할 때 lambda와 크롤링을 통해서 event driven 한 설계할 수 있음.
    - 활용 예시
      - 디시인사이드의 지진 갤러리에 올라오는 글 들을 크롤링해서 글이 많이 올라오면 지진이 났다고 판단하고 알림
  - 초 단위의 sub minute 이벤트 처리도 가능
    - lambda에 5초에 한번씩 queue message 전달해서 실행. cron event 에 등록해서 가능
  - Q&A
    - cold start 때문에 생기는 딜레이가 있을 것 같은데?
      - 거의 차이가 없음. 주기적으로 불리기 때문에 람다 인스턴스가 내려가지 않음.
    - 이벤트 모니터링은 어떻게 하는가?
      - 어려운 주제임. 회사에서는 datadog 사용중

> 요약: 이벤트 버스(Event Bridge)와 lambda를 통해서 재밌는 시도를 많이 할 수 있을 것 같다.
> 서버리스에 대해서 더 많이 알고, 느껴서 좋았고 많은 문제를 해결 할 수 있는 방법이라고 생각이 든다.
> 비단 백엔드만 인프라에 관심을 가지는게 아니라, 프론트엔드도 같이 인프라에 관심을 갖고 투자해야한다.

---

나도 인프라 자격증을 취득한 경험이 있다. 19년도에 AWS Solution Architecture를 취득했는데, 만료 기간이 지나서 지금은 사용하지 못한다.
이전부터 느꼈던건, 예전에 공부했던 백엔드, 네트워크, 클라우드 지식들이 지금 와서 개발하는데 큰 도움이 되고 있다고 본다.
프론트엔드를 개발하면서 그게 무슨 소용? 이라고 볼 수 있겠지만, 과거 백엔드의 영역들을 점점 프론트엔드가 가져오고 있고, 인프라까지 영역이 확대 된다면 프론트엔드 개발자들은 점차 전체를 넒게 바라볼 수 있는 Application 개발자에 가까워 질 거라 생각한다. 그게 내 최종 목표이기도 하다.

이번 세미나에서는 서버리스에 대해서 재밌는걸 많이 들었는데, 프론트엔드 개발자로서 실전에 적용할 만한 내용은

1. 주기적으로 크롤링이 필요하거나 다른 주기적으로 처리해야 하는 일들이 있을 때 `lambda` 사용하기
2. `Event Driven` 한 개발을 하기.
   1. 강의를 들으면서 느낀건, `AWS Event Bridge` 와는 전혀 상관없이, 이벤트가 주체가 되는 개발은 선언적이고 명확하며 알아보기 쉽다는 생각을 했다.
