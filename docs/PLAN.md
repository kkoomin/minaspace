# minaspace 구현 계획

## 개요

개인 기술 블로그 + 브랜딩 사이트. `docs/layout-mockup.html` 디자인을 기준으로 구현한다.

**기술 스택**

| 항목               | 버전                |
| ------------------ | ------------------- |
| Next.js            | 16.1.7 (App Router) |
| React              | 19.2.3              |
| Tailwind CSS       | v4                  |
| TypeScript         | v5                  |
| next-mdx-remote    | ^6.0.0              |
| gray-matter        | ^4.0.3              |
| rehype-pretty-code | ^0.14.3             |
| rehype-slug        | ^6.0.0              |
| remark-gfm         | ^4.0.1              |
| shiki              | ^4.0.2              |

**확정 라우팅 구조**

```
/               → 홈 (소개 + 최근 포스트 5개 + ALL/검색 필터)
/blog           → 블로그 목록 (10개 + 페이지네이션)
/blog/[slug]    → 포스트 상세 (MDX 본문 + sticky TOC)
/resume         → 이력서 (PDF 다운로드)
```

**홈 필터 방식**: ALL 버튼 + 검색 입력창 (태그 기반 클라이언트 필터링)

---

## 최종 파일 구조

```
app/
├── globals.css                  # 디자인 토큰 + prose + print 스타일
├── layout.tsx                   # 루트 레이아웃 (메타데이터 + Nav)
├── page.tsx                     # 홈 페이지
├── blog/
│   ├── page.tsx                 # 블로그 목록 + 페이지네이션
│   └── [slug]/
│       └── page.tsx             # 포스트 상세
└── resume/
    └── page.tsx                 # 이력서

components/
├── Nav.tsx                      # 공통 Nav (서버)
├── NavLinks.tsx                 # active 처리 (클라이언트)
├── PostItem.tsx                 # 포스트 행 (서버)
├── PostList.tsx                 # 포스트 목록 래퍼 (서버)
├── HomeFilter.tsx               # ALL + 검색 필터 (클라이언트)
├── Pagination.tsx               # 페이지네이션 (서버)
├── TableOfContents.tsx          # TOC 사이드바 (클라이언트)
└── ResumeDownLoadButton.tsx            # PDF 버튼 (클라이언트)

lib/
├── types.ts                     # 공통 타입 정의
├── posts.ts                     # MDX 파일 읽기 유틸리티
└── mdx.ts                       # MDX 컴파일 옵션

content/
└── posts/
    ├── zustand-domain-split.mdx
    ├── nuxt-to-nextjs-migration.mdx
    └── tanstack-query-key-factory.mdx
```

---

## 단계별 구현 계획

### Step 1. 디자인 시스템 & 레이아웃 기반

**목표**: 모든 페이지에서 공통으로 사용할 디자인 토큰, 레이아웃, Nav를 먼저 구성한다.

#### 1-1. `app/globals.css` 전면 재작성

layout-mockup.html의 CSS 변수를 Tailwind v4 `@theme` 블록으로 이식한다.
다크모드는 `prefers-color-scheme: dark` 미디어쿼리 기반으로 처리한다.

```css
@import "tailwindcss";

@theme inline {
  --color-bg:             #ffffff;
  --color-bg-secondary:   #f9f9f8;
  --color-bg-tertiary:    #f3f2ef;
  --color-text-primary:   #1a1a18;
  --color-text-secondary: #5a5a57;
  --color-text-tertiary:  #9a9a96;
  --color-border:         rgba(0,0,0,0.08);
  --color-border-strong:  rgba(0,0,0,0.14);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

/* 다크모드 토큰 오버라이드 */
@media (prefers-color-scheme: dark) { ... }

/* MDX 본문(prose) 타이포그래피 */
.prose h2, .prose h3, .prose p, .prose code { ... }

/* 이력서 PDF 출력 */
@media print {
  nav, .print-hidden { display: none !important; }
  @page { size: A4; margin: 18mm 16mm; }
  .resume-section, .exp-item { break-inside: avoid; }
  a::after { content: none !important; }
}
```

#### 1-2. `app/layout.tsx` 업데이트

- 메타데이터: `title: 'minaspace'`, `description` 추가
- Geist Sans / Geist Mono 폰트 유지
- `<body>`에 `<Nav />` 삽입
- 전체 배경을 `--color-bg-tertiary`로 설정

#### 1-3. `components/Nav.tsx` + `components/NavLinks.tsx`

**Nav.tsx** (서버 컴포넌트)

```
sticky top-0 z-10 bg-[--color-bg] border-b border-[--color-border]
내부: max-w-[640px] mx-auto px-6 h-[52px] flex items-center justify-between

좌측: <Link href="/">minaspace</Link>  — text-sm font-medium
우측: <NavLinks /> (클라이언트)
```

**NavLinks.tsx** (클라이언트 컴포넌트)

- `usePathname()`으로 현재 경로 감지
- `/blog` 매칭 시 Blog 링크 `font-medium text-[--color-text-primary]`
- `/resume` 매칭 시 Resume 링크 활성화
- 비활성: `text-[--color-text-secondary]`

---

### Step 2. 타입 정의 & MDX 유틸리티

#### 2-1. `lib/types.ts`

```ts
interface PostMeta {
  slug: string;
  title: string;
  date: string; // 'YYYY-MM-DD'
  tags: string[];
  description?: string;
}

interface Post extends PostMeta {
  content: string; // raw MDX string
}
```

#### 2-2. `lib/posts.ts`

`fs` + `path`로 `content/posts/*.mdx`를 읽어 `gray-matter`로 파싱한다.
모두 서버 사이드 전용 함수.

```ts
getAllPosts(): PostMeta[]        // 날짜 내림차순 정렬
getPostBySlug(slug: string): Post
getAllTags(): string[]           // 중복 제거, 사용 빈도 내림차순
```

#### 2-3. `lib/mdx.ts`

`next-mdx-remote/rsc`의 `compileMDX` 래퍼.
플러그인 옵션을 중앙에서 관리.

```ts
remarkPlugins: [remarkGfm];
rehypePlugins: [
  rehypeSlug, // heading에 id 부여 (TOC용)
  [rehypePrettyCode, { theme: "github-dark-dimmed" }], // 코드 하이라이팅
];
```

---

### Step 3. 공통 포스트 컴포넌트

#### 3-1. `components/PostItem.tsx` (서버)

overreacted.io 스타일의 카드 없는 텍스트 행.

```
<Link href="/blog/{slug}">
  flex items-baseline justify-between gap-4
  py-3 border-b border-[--color-border]
  첫 번째 아이템은 border-t 추가

  좌: 제목 — text-sm text-[--color-text-primary]
  우: 날짜 — text-xs font-mono text-[--color-text-tertiary] whitespace-nowrap
      형식: 'YYYY.MM'
```

#### 3-2. `components/PostList.tsx` (서버)

`PostMeta[]`를 받아 `PostItem` 목록을 렌더링하는 단순 래퍼.

#### 3-3. `components/Pagination.tsx` (서버)

URL `searchParam ?page=N` 기반 페이지네이션.

```
총 페이지 수 = Math.ceil(total / perPage)
이전(←) / 페이지 번호 / 다음(→) 버튼
현재 페이지: font-medium text-[--color-text-primary]
비활성: text-[--color-text-secondary]
```

---

### Step 4. 홈 페이지 (`/`)

**파일**: `app/page.tsx`

레이아웃:

```
max-w-[640px] mx-auto px-6 pt-12 pb-20 bg-[--color-bg] min-h-[calc(100vh-52px)]
```

구성:

**① 인트로 섹션** (서버)

```
<h1> 구민하  — text-[22px] font-medium mb-2
<p>  자기소개 2줄 — text-sm text-[--color-text-secondary] leading-[1.65]
```

**② `components/HomeFilter.tsx`** (`'use client'`)

서버에서 `getAllPosts()`를 호출해 전체 포스트를 props로 전달.
클라이언트에서 필터링 상태 관리.

```
flex gap-3 items-center mb-6

[ All ]     — active 시: bg-[--color-text-primary] text-[--color-bg]
              비활성:    bg-[--color-bg-secondary] border border-[--color-border]

[_검색어___] — text-sm border border-[--color-border] rounded px-3 py-1.5
               포커스: border-[--color-border-strong] outline-none
               placeholder: "태그로 검색..."
```

필터 로직:

- ALL 클릭 → 검색어 초기화, 최신 5개 표시
- 검색어 입력 → `post.tags`에 검색어 포함하는 포스트 필터링 (대소문자 무시)
- 필터링된 결과를 `PostList`에 전달, 최대 5개 표시

**③ 섹션 타이틀 + 포스트 목록**

```
<p> Posts — text-[11px] font-medium tracking-[0.07em] uppercase text-[--color-text-tertiary]
<PostList posts={filteredPosts} />
```

---

### Step 5. 블로그 목록 페이지 (`/blog`)

**파일**: `app/blog/page.tsx`

```ts
const POSTS_PER_PAGE = 10;
const page = Number(searchParams.page ?? 1);
const allPosts = getAllPosts();
const paginatedPosts = allPosts.slice(
  (page - 1) * POSTS_PER_PAGE,
  page * POSTS_PER_PAGE,
);
```

구성:

```
<h1> Blog — text-[22px] font-medium mb-8
<PostList posts={paginatedPosts} />
<Pagination total={allPosts.length} perPage={10} currentPage={page} />
```

---

### Step 6. 포스트 상세 페이지 (`/blog/[slug]`)

**파일**: `app/blog/[slug]/page.tsx`

#### 레이아웃 (2컬럼)

```
max-w-[860px] mx-auto px-6 py-12 bg-[--color-bg] min-h-[calc(100vh-52px)]
grid grid-cols-1 lg:grid-cols-[1fr_160px] gap-12 items-start
```

#### 메인 컬럼

```
① 뒤로가기 버튼
   <Link href="/blog">
     ← (화살표 아이콘)
   </Link>
   — text-sm text-[--color-text-secondary] hover:text-[--color-text-primary] mb-8 block

② 포스트 헤더
   <h1> 제목  — text-[24px] font-medium leading-[1.35] mb-3
   <div> 날짜(font-mono text-xs) · 태그 뱃지들
         태그: text-[11px] bg-[--color-bg-secondary] border rounded px-[7px] py-[1px]

③ <hr> — border-[--color-border] my-6

④ MDX 본문
   <article className="prose">
     <MDXRemote source={content} options={mdxOptions} />
   </article>
```

#### TOC 사이드바 `components/TableOfContents.tsx` (`'use client'`)

- `useEffect`에서 `document.querySelectorAll('h2, h3')` 수집 → TOC 항목 생성
- `IntersectionObserver`로 스크롤 위치 감지, active 항목 업데이트
- `hidden lg:block sticky top-[68px]`

```
목차 — text-[10px] font-medium tracking-[0.08em] uppercase text-[--color-text-tertiary] mb-2.5

각 항목: text-xs text-[--color-text-tertiary] py-1 pl-2.5 border-l-2 border-[--color-border]
active:  text-[--color-text-primary] border-[--color-text-primary] font-medium
h3 항목: pl-5 (들여쓰기)
```

#### generateStaticParams

```ts
export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}
```

#### generateMetadata

```ts
export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  return { title: `${post.title} — minaspace` };
}
```

---

### Step 7. 이력서 페이지 (`/resume`)

**파일**: `app/resume/page.tsx`

레이아웃: 홈과 동일한 `max-w-[640px]` 단일 컬럼.
콘텐츠는 하드코딩(정적 데이터).

구성:

```
① ResumeDownLoadButton (클라이언트)
   <button onClick={() => window.print()}>↓ PDF로 저장</button>
   — text-xs border border-[--color-border] rounded-lg px-3 py-1.5 mb-8 print:hidden

② 이력서 헤더
   이름(22px font-medium) · 직무(text-sm text-secondary) · contacts(font-mono text-xs)
   contacts: 이메일 / 전화 / LinkedIn / GitHub — flex gap-4 flex-wrap

③ Experience 섹션
   섹션 타이틀: 11px uppercase tracking text-tertiary border-b mb-4
   경력 아이템: 회사명(bold) + 재직기간(font-mono) / 직무(text-secondary) / bullet 목록

④ Skills 섹션
   카테고리 라벨 + 태그 뱃지들

⑤ Education 섹션
   학교명 + 졸업일 / 전공
```

---

### Step 8. 샘플 MDX 콘텐츠 작성

`content/posts/`에 샘플 포스트 3개 작성.

frontmatter 형식:

```yaml
---
title: "Zustand 스토어를 도메인 단위로 분리한 이유"
date: "2025-03-10"
tags: ["Next.js", "Zustand"]
description: "..."
---
```

샘플 파일:

- `zustand-domain-split.mdx` — 코드 블록, h2/h3 포함 (TOC 테스트용)
- `nuxt-to-nextjs-migration.mdx`
- `tanstack-query-key-factory.mdx`

---

## 구현 순서 요약

```
1. globals.css       → 디자인 토큰 확립
2. layout.tsx + Nav  → 전체 셸 완성
3. lib/types.ts      → 타입 정의
4. lib/posts.ts      → 데이터 레이어
5. lib/mdx.ts        → MDX 파이프라인
6. 공통 컴포넌트     → PostItem, PostList, Pagination
7. 홈 페이지 (/)     → HomeFilter (클라이언트)
8. 블로그 목록 (/blog)
9. 포스트 상세       → MDX + TOC
10. 이력서 (/resume) → ResumeDownLoadButton (클라이언트)
11. 샘플 MDX 파일    → 콘텐츠 검증
```

---

## 검증 방법

1. `pnpm dev` 실행 후 각 라우트 접근
   - `/` → 인트로 + ALL 버튼 + 검색 입력창 + 포스트 5개
   - `/blog` → 전체 목록 + 하단 페이지네이션
   - `/blog/[slug]` → MDX 렌더링 + 코드 하이라이팅 + 우측 TOC
   - `/resume` → 이력서 레이아웃 + PDF 버튼
2. 홈 검색 입력창에 태그 검색어 입력 → 필터링 동작 확인
3. 포스트 상세 스크롤 → TOC active 항목 업데이트 확인
4. `/resume`에서 `Cmd+P` → nav, PDF 버튼 숨김 확인 (print:hidden)
5. 다크모드 확인 (시스템 설정 변경)
6. 모바일 뷰 (< 768px) → TOC 숨김, 640px 이하 레이아웃 확인
7. `pnpm build` → 빌드 에러 없음 확인
