# minaspace 구현 태스크 목록

> PLAN.md 기반 구현 순서별 상세 태스크.
> 각 태스크는 단일 파일 또는 단일 책임 단위.
> 상태: `[ ]` 미완료 · `[x]` 완료 · `[-]` 진행중

## 아이콘 라이브러리

**lucide-react** `^0.577.0` 사용 (`pnpm add lucide-react`로 설치됨)

| 사용 위치                             | 컴포넌트      | 아이콘      |
| ------------------------------------- | ------------- | ----------- |
| `app/blog/[slug]/page.tsx`            | 뒤로가기 버튼 | `ArrowLeft` |
| `components/ResumeDownloadButton.tsx` | PDF 저장 버튼 | `Download`  |

---

## Step 1. 디자인 시스템 & 레이아웃 기반

### T01. 디자인 토큰 & 기본 스타일 — `app/globals.css`

- [x] `@import "tailwindcss"` 유지
- [x] `@theme inline` 블록에 디자인 토큰 정의 (layout-mockup.html 기준)
  - 색상: `--color-bg`, `--color-bg-secondary`, `--color-bg-tertiary`
  - 텍스트: `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`
  - 테두리: `--color-border`, `--color-border-strong`
  - 폰트: `--font-sans`, `--font-mono`
- [x] `@media (prefers-color-scheme: dark)` 다크모드 토큰 오버라이드
- [x] `body` 기본 스타일 (배경, 색상, line-height)

**완료 기준**: Tailwind 커스텀 컬러로 `bg-[--color-bg]` 클래스가 적용됨

---

### T02. MDX 본문 prose 스타일 — `app/globals.css`

- [x] `.prose` 클래스 하위 타이포그래피 정의
  - `h1`, `h2`, `h3`: 폰트 크기, 굵기, margin
  - `p`: line-height 1.75, margin-bottom
  - `a`: 색상, hover 언더라인
  - `ul`, `ol`, `li`: padding, list-style
  - `blockquote`: 좌측 border, 색상
  - `code` (인라인): `bg-[--color-bg-secondary]` 배경, border-radius, padding
  - `pre`: rehype-pretty-code가 생성하는 `[data-rehype-pretty-code-figure]` 래퍼 스타일
  - `hr`: `border-[--color-border]`
  - `img`: `max-width: 100%`, `border-radius`

**완료 기준**: 샘플 MDX 렌더링 시 가독성 있는 본문 스타일 적용됨

---

### T03. 이력서 print 스타일 — `app/globals.css`

- [x] `@media print` 블록 추가
  - `nav`, `.print-hidden` → `display: none !important`
  - `body`: 배경 흰색, 텍스트 검정
  - `@page`: `size: A4; margin: 18mm 16mm`
  - `.resume-section`, `.exp-item`: `break-inside: avoid`
  - `a::after`: `content: none !important` (링크 URL 출력 방지)
  - `.resume-section-title`: `border-bottom-color: #ccc`

**완료 기준**: `/resume`에서 `Cmd+P` 시 nav/버튼 숨김, A4 여백 적용됨

---

### T04. 루트 레이아웃 — `app/layout.tsx`

- [x] 메타데이터 업데이트
  ```ts
  export const metadata: Metadata = {
    title: { default: "minaspace", template: "%s — minaspace" },
    description: "Space for Developer",
  };
  ```
- [x] Geist Sans / Geist Mono 폰트 유지
- [x] `<body>` className: `bg-[--color-bg-tertiary] text-[--color-text-primary] font-sans`
- [x] `<Nav />` 컴포넌트를 `<body>` 최상단에 삽입
- [x] `{children}` 렌더링

**완료 기준**: 모든 페이지에 Nav가 노출되고 전체 배경이 bg-tertiary로 적용됨

---

### T05. Nav 컴포넌트 — `components/Nav.tsx` + `components/NavLinks.tsx`

**Nav.tsx** (서버 컴포넌트)

- [x] `sticky top-0 z-10` 포지셔닝
- [x] 배경 `bg-[--color-bg]`, 하단 보더 `border-b border-[--color-border]`
- [x] 내부: `max-w-[640px] mx-auto px-6 h-[52px] flex items-center justify-between`
- [x] 좌측: `<Link href="/">minaspace</Link>` — `text-sm font-medium`
- [x] 우측: `<NavLinks />` (클라이언트 컴포넌트)

**NavLinks.tsx** (`'use client'`)

- [x] `usePathname()`으로 현재 경로 감지
- [x] Blog 링크 (`/blog`), Resume 링크 (`/resume`)
- [x] active: `pathname.startsWith(href)` 조건으로 판단
- [x] active 스타일: `font-medium text-[--color-text-primary]`
- [x] 비활성: `text-[--color-text-secondary] hover:text-[--color-text-primary]`

**완료 기준**: `/blog` 접근 시 Blog 링크 활성화, `/resume` 접근 시 Resume 활성화

---

## Step 2. 타입 정의 & MDX 유틸리티

### T06. 공통 타입 — `lib/types.ts`

- [x] `PostMeta` 인터페이스
  ```ts
  interface PostMeta {
    slug: string;
    title: string;
    date: string; // 'YYYY-MM-DD'
    tags: string[];
    description?: string;
  }
  ```
- [x] `Post` 인터페이스 (`PostMeta` 확장)
  ```ts
  interface Post extends PostMeta {
    content: string; // raw MDX string
  }
  ```

**완료 기준**: 타입 임포트 후 TypeScript 에러 없음

---

### T07. 포스트 유틸리티 — `lib/posts.ts`

- [x] `content/posts/*.mdx` 파일 목록 읽기 (`fs.readdirSync`)
- [x] `getAllPosts(): PostMeta[]`
  - 각 파일을 `gray-matter`로 파싱해 frontmatter 추출
  - slug = 파일명에서 `.mdx` 제거
  - 날짜 내림차순 정렬 (`new Date(b.date) - new Date(a.date)`)
- [x] `getPostBySlug(slug: string): Post`
  - 파일 읽기 → `gray-matter`로 파싱 → `{ ...data, slug, content: content }` 반환
- [x] `getAllTags(): string[]`
  - 모든 포스트의 tags 수집 → Set으로 중복 제거

**완료 기준**: 샘플 MDX 파일 추가 후 `getAllPosts()` 호출 시 목록 반환됨

---

### T08. MDX 컴파일 옵션 — `lib/mdx.ts`

- [x] `next-mdx-remote/rsc`의 `compileMDX` 래퍼 함수 작성
- [x] 플러그인 설정
  ```ts
  remarkPlugins: [remarkGfm];
  rehypePlugins: [
    rehypeSlug, // h2, h3에 id 자동 부여 (TOC용)
    [
      rehypePrettyCode,
      {
        theme: "github-dark-dimmed",
        keepBackground: false,
      },
    ],
  ];
  ```
- [x] 반환 타입: `Promise<{ content: ReactElement }>`

**완료 기준**: MDX 문자열을 넘기면 React 엘리먼트 반환됨

---

## Step 3. 공통 컴포넌트

### T09. 포스트 아이템 — `components/PostItem.tsx`

- [x] Props: `post: PostMeta`
- [x] `<Link href={'/blog/' + post.slug}>` 래퍼
- [x] 레이아웃: `flex items-baseline justify-between gap-4 py-3`
- [x] 상단 보더: `border-b border-[--color-border]`, 첫 번째 아이템 `border-t` 추가
  - 단: PostList에서 첫 번째 여부를 prop으로 받거나 CSS `:first-child` 활용
- [x] 좌: 제목 `text-sm text-[--color-text-primary]`
- [x] 우: 날짜 `text-xs font-mono text-[--color-text-tertiary] whitespace-nowrap flex-shrink-0`
  - 형식: `date.slice(0, 7).replace('-', '.')` → `'2025.03'`
- [x] hover 시 제목 `text-[--color-text-secondary]`

**완료 기준**: 포스트 목록에서 텍스트 행 스타일로 렌더링됨

---

### T10. 포스트 목록 — `components/PostList.tsx`

- [x] Props: `posts: PostMeta[]`
- [x] `<div className="mt-1">` 래퍼
- [x] `posts.map(post => <PostItem key={post.slug} post={post} />)` 렌더링
- [x] `posts.length === 0`이면 `<p>포스트가 없습니다.</p>` 표시

**완료 기준**: posts 배열 전달 시 PostItem 목록 렌더링됨

---

### T11. 페이지네이션 — `components/Pagination.tsx`

- [x] Props: `total: number`, `perPage: number`, `currentPage: number`, `basePath: string`
- [x] 총 페이지 수 = `Math.ceil(total / perPage)`
- [x] 총 페이지 수 ≤ 1이면 렌더링하지 않음
- [x] 이전(←) 버튼: `currentPage > 1`일 때 활성화 → `?page=${currentPage - 1}`
- [x] 다음(→) 버튼: `currentPage < totalPages`일 때 활성화 → `?page=${currentPage + 1}`
- [x] 페이지 번호: 현재 페이지 `font-medium text-[--color-text-primary]`, 나머지 `text-[--color-text-secondary]`
- [x] `<Link>` 기반 (클라이언트 상태 불필요)

**완료 기준**: 10개 초과 포스트가 있을 때 페이지 이동 동작함

---

## Step 4. 홈 페이지

### T12. 홈 필터 컴포넌트 — `components/HomeFilter.tsx`

- [x] `'use client'` 선언
- [x] Props: `posts: PostMeta[]` (서버에서 전체 포스트 전달)
- [x] 상태: `query: string` (검색어)
- [x] 필터 로직
  - `query === ''`: 최신 5개 그대로 표시
  - `query !== ''`: `post.tags`에 `query`를 포함하는 포스트 필터링 (대소문자 무시), 5개 제한 없음
- [x] UI

  ```
  flex gap-3 items-center mb-6

  [ All ]  버튼 — query === '' 일 때 active 스타일
            클릭 시 query 초기화
            active: bg-[--color-text-primary] text-[--color-bg] border-[--color-text-primary]
            비활성: bg-[--color-bg-secondary] text-[--color-text-secondary] border-[--color-border]
            공통: text-[11px] font-medium px-2.5 py-1 rounded border cursor-pointer

  [검색어___]  input
            text-sm border border-[--color-border] rounded px-3 py-1.5
            focus: border-[--color-border-strong] outline-none
            placeholder="Search posts"
  ```

- [x] 섹션 타이틀 `Posts` + `<PostList posts={filteredPosts} />`를 내부에 포함

**완료 기준**: 검색어 입력 시 태그 매칭 포스트로 목록 업데이트됨

---

### T13. 홈 페이지 — `app/page.tsx`

- [x] 서버 컴포넌트
- [x] `getAllPosts()` 호출
- [x] 레이아웃: `max-w-[640px] mx-auto px-6 pt-12 pb-20 bg-[--color-bg] min-h-[calc(100vh-52px)]`
- [x] 인트로 섹션
  ```tsx
  <div className="mb-10">
    <h1>구민하</h1> {/* text-[22px] font-medium mb-2 */}
    <p>자기소개 텍스트</p>
    {/* text-sm text-[--color-text-secondary] leading-[1.65] */}
  </div>
  ```
- [x] `<HomeFilter posts={allPosts} />`

**완료 기준**: `/` 접근 시 인트로 + 필터 + 최근 포스트 5개 노출됨

---

## Step 5. 블로그 목록 페이지

### T14. 블로그 목록 — `app/blog/page.tsx`

- [x] 서버 컴포넌트 (searchParams 사용)
- [x] `POSTS_PER_PAGE = 10`
- [x] `page = Number(searchParams?.page ?? 1)`
- [x] `getAllPosts()` → 슬라이싱으로 페이지네이션 처리
- [x] 레이아웃: 홈과 동일한 `max-w-[640px]` 래퍼
- [x] 구성
  ```tsx
  <h1>Blog</h1>              {/* text-[22px] font-medium mb-8 */}
  <PostList posts={paginatedPosts} />
  <Pagination
    total={allPosts.length}
    perPage={10}
    currentPage={page}
    basePath="/blog"
  />
  ```
- [x] `generateMetadata`: `title: 'Blog'`

**완료 기준**: `/blog` 접근 시 목록 + 페이지네이션 노출, `?page=2`로 다음 페이지 이동됨

---

## Step 6. 포스트 상세 페이지

### T15. TOC 컴포넌트 — `components/TableOfContents.tsx`

- [x] `'use client'` 선언
- [x] Props: 없음 (DOM에서 직접 heading 수집)
- [x] `useEffect`에서 `document.querySelectorAll('.prose h2, .prose h3')` 수집
  - 각 heading의 `id`, `textContent`, 레벨(h2/h3) 추출
  - 상태 `headings: { id: string, text: string, level: 2 | 3 }[]`
- [x] `IntersectionObserver`로 화면에 보이는 heading 감지 → `activeId` 상태 업데이트
- [x] 레이아웃

  ```
  hidden lg:block sticky top-[68px]

  목차 라벨: text-[10px] font-medium tracking-[0.08em] uppercase text-[--color-text-tertiary] mb-2.5

  각 항목: block text-xs py-1 pl-2.5 border-l-2 leading-[1.4] no-underline
           기본: text-[--color-text-tertiary] border-[--color-border]
           active: text-[--color-text-primary] border-[--color-text-primary] font-medium
           h3: pl-5 (h2보다 들여쓰기)
  ```

**완료 기준**: 포스트 상세에서 스크롤 시 TOC active 항목이 변경됨

---

### T16. 포스트 상세 — `app/blog/[slug]/page.tsx`

- [x] 서버 컴포넌트
- [x] `getPostBySlug(params.slug)`로 포스트 데이터 조회
  - 없으면 `notFound()` 호출
- [x] `compileMDX` (lib/mdx.ts)로 MDX 컴파일
- [x] `generateStaticParams`: `getAllPosts().map(p => ({ slug: p.slug }))`
- [x] `generateMetadata`: `title: post.title`
- [x] 레이아웃 (2컬럼)
  ```
  max-w-[860px] mx-auto px-6 py-12 bg-[--color-bg] min-h-[calc(100vh-52px)]
  grid grid-cols-1 lg:grid-cols-[1fr_160px] gap-12 items-start
  ```
- [x] 메인 컬럼 구성

  ```tsx
  {/* 뒤로가기 버튼 */}
  <Link href="/blog">← 목록으로</Link>  {/* ← 아이콘 + text-sm */}

  {/* 포스트 헤더 */}
  <h1>{post.title}</h1>
  <div>
    <span>{날짜 font-mono}</span>
    {post.tags.map(tag => <span key={tag}>{tag}</span>)}
  </div>

  <hr />

  {/* MDX 본문 */}
  <article className="prose">
    {content}
  </article>
  ```

- [x] 날짜 형식: `'YYYY.MM.DD'` (font-mono text-xs text-[--color-text-tertiary])
- [x] 태그 뱃지: `text-[11px] bg-[--color-bg-secondary] border border-[--color-border] rounded px-[7px] py-[1px]`
- [x] TOC 컬럼: `<TableOfContents />`

**완료 기준**: `/blog/[slug]` 접근 시 MDX 렌더링 + 코드 하이라이팅 + TOC 노출됨

---

## Step 7. 이력서 페이지

### T17. 이력서 PDF 버튼 — `components/ResumeDownloadButton.tsx`

- [x] `'use client'` 선언
- [x] `<button onClick={() => downloadResume()}>↓ PDF로 저장</button>`
- [x] 스타일: `inline-flex items-center gap-1.5 text-xs border border-[--color-border] rounded-lg px-3 py-1.5 mb-8 print:hidden`
- [x] hover: `border-[--color-border-strong] text-[--color-text-primary]`

**완료 기준**: 클릭 시 public/files/resume.pdf 파일 다운로드 (현재 파일 없으므로 가상의 resume.pdf 파일 만들어서 저장 후 구현)

---

### T18. 이력서 페이지 — `app/resume/page.tsx`

- [x] 서버 컴포넌트 (콘텐츠 하드코딩)
- [x] `generateMetadata`: `title: 'Resume'`
- [x] 레이아웃: `max-w-[640px] mx-auto px-6 pt-12 pb-20 bg-[--color-bg] min-h-[calc(100vh-52px)]`
- [x] `<ResumeDownloadButton />` 삽입
- [x] 이력서 헤더
  ```
  이름:     구민하 Minha Koo — text-[22px] font-medium mb-1
  직무:     프론트엔드 개발자 — text-sm text-[--color-text-secondary] mb-3
  contacts: flex gap-4 flex-wrap font-mono text-xs text-[--color-text-tertiary]
            이메일 / 전화 / LinkedIn / GitHub
  ```
- [x] Experience 섹션
  - 섹션 타이틀: `text-[11px] font-medium tracking-[0.07em] uppercase text-[--color-text-tertiary] border-b border-[--color-border] pb-2 mb-4`
  - 경력 아이템 2개: 회사명(font-medium) + 재직기간(font-mono) / 직무(text-secondary) / bullet 목록
- [x] Skills 섹션 (Languages & Frameworks / Libraries & Tools)
- [x] Education 섹션 (FlatIron School / 이화여대)

**완료 기준**: `/resume` 접근 시 이력서 전체 콘텐츠 노출, PDF 버튼 동작함

---

## Step 8. 샘플 콘텐츠

### T19. 샘플 MDX 파일 — `content/posts/*.mdx`

**공통 frontmatter 형식**

```yaml
---
title: "제목"
date: "YYYY-MM-DD"
tags: ["태그1", "태그2"]
description: "한 줄 설명"
---
```

- [x] `content/posts/zustand-domain-split.mdx`
  - tags: `["Next.js", "Zustand"]`
  - h2 섹션 3개 이상 포함 (TOC 테스트용)
  - 코드 블록 포함 (TypeScript)

- [x] `content/posts/nuxt-to-nextjs-migration.mdx`
  - tags: `["Next.js", "마이그레이션"]`
  - h2/h3 혼합 포함
  - 이미지 포함

- [x] `content/posts/tanstack-query-key-factory.mdx`
  - tags: `["React", "TanStack Query"]`
  - 코드 블록 + 인라인 코드 포함

**완료 기준**: 샘플 파일 추가 후 홈 및 블로그 목록에 포스트 3개 노출됨

---

## 전체 진행 현황

| 단계                    | 태스크  | 상태  |
| ----------------------- | ------- | ----- |
| Step 1. 디자인 시스템   | T01–T05 | `[x]` |
| Step 2. 타입 & 유틸리티 | T06–T08 | `[x]` |
| Step 3. 공통 컴포넌트   | T09–T11 | `[x]` |
| Step 4. 홈 페이지       | T12–T13 | `[x]` |
| Step 5. 블로그 목록     | T14     | `[x]` |
| Step 6. 포스트 상세     | T15–T16 | `[x]` |
| Step 7. 이력서          | T17–T18 | `[x]` |
| Step 8. 샘플 콘텐츠     | T19     | `[x]` |
