# Project Requirements: minaspace

## 1. Overview

- 프론트엔드 개발자의 기술 블로그 및 개인 브랜딩 웹사이트 제작

## 2. Tech Stack

- Next.js 15 App Router, Tailwind v4, TypeScript
- Libraries: next-mdx-remote, gray-matter, rehype-pretty-code, rehype-slug, remark-gfm, shiki

## 3. Feature

### Layout

- 최상단에 Header 고정
  - 좌측에는 웹사이트 이름(minaspace), 우측에는 nav 노출(Blog, Resume)
- 웹사이트 이름 클릭 시 메인 페이지로 이동
- nav 클릭 시 해당하는 페이지로 이동

### 메인 페이지 ('/')

- 상단에 이름과 간단한 자기소개 노출
- 블로그 포스트 목록 필터링 영역 노출
  - 모든 포스트 중 가장 최신 게시글 4-5개를 노출하는 'ALL' 버튼
  - 검색어를 입력할 수 있는 검색어 입력창(input)
- default: 블로그 최신 포스트 목록(4-5개 게시글) 노출
- 검색어 입력창에 검색어 입력 시, 포스트 목록에 해당 검색어에 속하는 태그가 달린 포스트 검색되어 노출

### Blog: 블로그 포스트 목록 페이지 ('/blog')

- 메인 페이지의 블로그 포스트와 같은 디자인의 포스트 목록 노출 (default 포스트 개수: 10)
- 하단에 포스트 목록 페이지네이션 기능

### 블로그 포스트 상세 페이지 ('/blog/[slug]')

- 좌측 컬럼에 포스트 제목, 작성 날짜, 관련 태그, 내용 노출
- 우측 컬럼에 TOC 노출
- 페이지 상단에 뒤로가기 버튼 노출 - 화살표 아이콘으로 표시

### 이력서 ('/resume')

- 이력서 노출
  - 이름, 직무, 총 경력
  - contacts
  - Experience, Skills, Project, Education, Certification & etc
- 우측 상단에 '이력서 PDF' 버튼 노출
  - 클릭 시, 이력서 pdf 다운로드 가능

### 4. Spec

- 전체 컬럼 폭: max-w-[640px] 중앙 정렬
- nav: 로고(이름) 왼쪽 / Blog · Resume 링크 오른쪽, border-bottom
- 홈(/): 소개 텍스트 → 'ALL' 버튼, 검색어 입력창 → 포스트 목록(카드 없이 텍스트 행, 날짜 오른쪽 font-mono)
- 포스트 상세(/posts/[slug]): 본문 640px + 우측 sticky TOC (lg 이하 숨김)
- 이력서(/resume): 동일 레이아웃 안에서 Experience, Skills 등 섹션별 구성
- 참고 사이트: overreacted.io(텍스트 목록), leerob.io(nav·전체 구조)
