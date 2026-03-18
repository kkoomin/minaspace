## 프로젝트 개요

개인 기술 블로그 + 브랜딩 사이트

## 기술 스택

- Next.js 16 App Router (현재 설치 버전 기준)
- Tailwind CSS v4
- TypeScript
- 블로그 post : MDX (`next-mdx-remote/rsc` + `gray-matter` + `remark-gfm` + `rehype-slug` + `rehype-pretty-code`)
- 아이콘: lucide-react
- 배포: Vercel

## 페이지 구조

- / : 블로그 홈 (포스트 목록 + ALL 버튼 + 검색 입력창)
- /blog : 전체 포스트 목록 (페이지네이션)
- /blog/[slug] : 포스트 상세 (본문 + sticky TOC)
- /resume : 이력서

## 디자인 원칙

- max-width: 640px 단일 컬럼, mx-auto
- nav: border-b는 outer nav가 아닌 inner max-w-[640px] div에 적용 (시각적으로 640px 고정)
- nav: 로고 좌측 / Blog/Resume 우측, sticky
- 포스트 목록: 카드 없이 텍스트 행, 날짜는 font-mono 우측 정렬
- 레이아웃 참고: \_reference/layout-mockup.html

## 코드 컨벤션

- 컴포넌트, 파일명: PascalCase
- 훅: camelCase, use 접두사
- 타입: interface 우선, type은 union/intersection만
- any 사용 금지, 불필요한 타입 단언 지양
- 접근성 중시: alt 속성, semantic HTML, 키보드 navigation 등
- 서버 컴포넌트 기본, 클라이언트 컴포넌트는 'use client' 명시

## 구현 패턴 메모

- Next.js 16에서 `searchParams`는 async: `searchParams: Promise<{page?: string}>` + `await searchParams`
- MDX 코드블록 듀얼 테마: `rehype-pretty-code`의 `theme: { dark: 'github-dark-dimmed', light: 'github-light' }` + `data-theme` CSS 변수로 스타일링
- Resume PDF 다운로드: `<a href="/files/resume.pdf" download>` 방식 사용. 실제 파일은 `public/files/resume.pdf`에 배치 필요
- 홈 필터: query 없으면 최신 5개, query 있으면 tags 필터링 (`HomeFilter.tsx` 클라이언트 컴포넌트)

## 절대 하지 말 것

- main 브랜치에 직접 커밋 금지
- .env 파일 수정 금지
- output: 'export' 설정 금지 (Vercel 배포)
- console.log 커밋 금지

## MCP 사용 규칙

### 코드 작성 전 필수

- Next.js, React, TypeScript 관련 작업 시 next-devtools-mcp의 `init` 툴을 먼저 호출
- 외부 라이브러리 코드 작성 전 반드시 Context7으로 최신 문서를 확인

## 레이아웃 목업

\_reference/layout-mockup.html 파일 참고

```

```
