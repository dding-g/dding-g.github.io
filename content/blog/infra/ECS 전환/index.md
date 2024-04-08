---
title: FE개발자의 ECS 전환기
date: 2024-01-10T15:54:38.995Z
description: Elastic Beanstalk에서 ECS로 전환한 이유를 간단하게 정리한 글
tags:
  - AWS
  - ECS
---

# 운영 환경의 문제점 인식

처음에 AWS의 `Elastic Beanstalk` 를 사용했는데 개발자 로컬환경에서 배포하는 형식이였다. 이걸 채택한건 다른 인프라 환경을 수동으로 구성하기에는 시간이 없었고, 기존 backend 배포가 이런 형식으로 되어있었기에 배포 환경을 통일하자는 의견에서 나온 선택이였다.
EB환경 배포에는 몇가지 문제가 있다.

1. 개발자 로컬환경에서 CLI로만 배포가 가능.
2. 배포 프로세스가 수동.
3. 업로드 가능한 파일 limit이 500MB.
4. Node 16 까지 지원.

1번 -> 이 말은 내가 휴가를 가면 다른 사람에게 로컬 배포환경을 인수인계 하고 가야한다.
2번 -> 빌드부터 배포까지 모든 과정이 수동으로 이뤄졌기 때문에 실수로 환경변수를 잘못 설정하면 dev 환경으로 배포될 가능성이 충분히 있다. (휴먼에러)
3번 -> 처음에는 어찌저찌 업로드가 가능했지만, 빌드하고 node_modules 폴더도 같이 업로드가 되기 때문에 docker image도 가볍게 500MB를 넘었다.
4번 -> 이때 LTS가 node 18 이였는데 반년이 넘도록 EB에서는 Node 16 환경만 구성이 가능했다.

이런 이유로 운영 인프라 환경을 바꾸는게 필요했다.
우리는 인프라 엔지니어가 없었기 때문에 + 아직 인프라를 크게 신경쓸 정도의 트래픽이 아니라고 판단하고 서비스 개발에만 집중 할 수 있는 환경을 바랬다.
이렇게 제품 개발에만 집중할 수 있도록 로드벨런싱, 컨테이너 관리, 스케일링, 로깅 등을 지원해주는게 AWS의 ECS(Elastic Container Service)이다. AWS 에서 제공하는 관리형 오케스트레이션이며 체감상 비용도 크게 필요하지 않다.
이미 EB 환경을 구성하면서 Docker 파일은 만들어 두었고 해당 컨테이너를 무사히 ECS에만 올리면 인프라 관리에 대한 걱정은 이제 끝!

# ECS로 이사가기

![image](https://ddinglog-image.s3.ap-northeast-2.amazonaws.com/2024-3-30/0dbc99a0dbc6204ade40ec9b090e76bb.png)

ECS는 컨테이너 관리형 오케스트레이션이다. ECS에서 Task(도커 컨테이너 구성 설명)를 정의하고 실행시킬 때, Fargate가 해당 Task기반으로 EC2 인스턴스를 띄우고 도커 이미지를 실행시키고 health check, 롤링 배포 등을 진행한다.
우리는 이 `Task`를 어떻게 구성할지만 고민하면 다른건 크게 신경 쓸 건 없다.

## 1. Docker Image 빌드

```sh
docker build -f ${DOCKER_FILE_PATH} . -t ${LOCAL_DOCKER_TAG}
```
같은 빌드 서버에서 image를 빌드하면서 `Docker cache` 이점을 활용하도록 구성했다.
쌓이는 Docker layer cache로 storage가 부족한 경우가 생겨서, 주기적으로 docker image를 prune 시키는 cron 작업도 추가했다.


## 2. ECR 업로드

ECS에 배포하기 위한 Docker Image를 저장하는 저장소가 필요하다.
보통 AWS ECR 서비스를 많이 사용하는데 가격도 합리적이고 기존에 구축되어 있는 저장소가 따로 없었기 때문에 ECR을 채택했다.
```
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_HOST}
docker tag ${LOCAL_DOCKER_TAG} ${ECR_DOCKER_TAG}
docker push ${ECR_DOCKER_TAG}
```
업로드시 필요한 aws credential 작업 후 docker tag를 변경하고 docker image를 ECR에 업로드한다.


## 3. ECS 배포

ECS에 배포하기 위해서는 Task정의가 필요하다.
Task Definition에는 ECS에 어떤 이미지를 배포하고 어떤 경로로 health check를 하며 어떤 사양으로 인스턴스를 띄울지 등 Application 인스턴스 구성에 필요한 내용으로 채워진다.

```
{
    "taskDefinitionArn": "{Task Definition ARN}",
    "containerDefinitions": [
        {
            "name": "{container name}",
            "image": "{ECR Image path}",
            "cpu": 1024,
            "portMappings": [
                {
                    "name": "{Alias}",
                    "containerPort": 3000,
                    "hostPort": 8080,
                    "protocol": "tcp",
                    "appProtocol": "http"
                }
            ],
            ...,
        }
    ],    
    ...
}

```

ECS Task Definition은 JSON으로 수동 구성할 수 있지만, GUI로도 구성할 수 있다.
ECS 서비스, Task 구성시 LB, target group, docker container 에서 health check가 이뤄지는데 보안 그룹 설정에 docker container 포트도 열어줘야 health check를 정상적으로 통과할 수 있으니 참고하자. 각 단계에서 디버깅 할 수 있는 방법이 많이 없어서 고생했던 기억이 있다.


---

기존 EB 환경에서 ECS환경으로 구성을 변경한지 꽤나 오랜 시간이 지났다.
"인프라를 덜 신경쓰고 Application 비즈니스 로직 개발에 집중하자!" 는 목표는 달성했다고 보여지고 단점은 거의 보이지 않았다. Application 로그를 보기 힘들다 정도? 이마저도 cloud watch를 잘 활용해서 로그를 관리할 수 있으니 인프라 엔지니어가 없는 스타트업 규모나 작은 팀에서 운영하는 Application은 ECS를 적극적으로 활용해보자.
인프런에서는 ECS로 최근까지도 서비스를 운영했다는 글을 봤는데 회원수가 수십만이 될 때 까지도 ECS로 운영했다고 하니 참고해보자.
[스타트업 엔지니어의 AWS 비용 최적화 경험기](https://tech.inflab.com/20240227-finops-for-startup/)
