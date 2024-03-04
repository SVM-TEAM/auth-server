# Branch Rule

| 브랜치 유형 | 작업 내용        | 예시 이름          |
| ----------- | ---------------- | ------------------ |
| feat        | 새로운 기능 개발 | feat/sign-up       |
| bugfix      | 버그 수정        | bugfix/sign-up     |
| hotfix      | 긴급 버그 수정   | hotfix/sign-up     |
| release     | 릴리즈 준비 작업 | release/v1.2       |
| refactor    | 코드 리팩토링    | refactor/common-ui |

# Commit Rule

```
[FEAT] 수정 사항 제목 or 코드
[RV] 리뷰어
- 수정 내역
- 수정 내역
```

# Project Architecture

패턴 : CQRS 패턴 사용

기능

- 사용자 인증 처리
- 비대칭키 JWT 토큰 사용
- 이메일 인증 및 리프레시 토큰 레디스 사용
