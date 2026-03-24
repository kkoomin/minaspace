---
name: to-mdx
description: Converts a blog post or published Notion page to an MDX file for the minaspace blog. TRIGGER this skill whenever the user provides a URL and says "mdx로 변환", "mdx 파일로 만들어줘", "블로그 포스트로 변환", or any similar phrase requesting conversion of a web page or Notion link to an MDX blog post. Also trigger when the user pastes a URL and asks to add it to the blog.
---

# to-mdx: URL → MDX 변환 스킬

블로그 링크나 발행된 Notion 링크를 받아 minaspace 블로그 포스트용 MDX 파일로 변환합니다.

## 저장 경로

반드시 `/Users/kkoomin/Development/minaspace/content/posts/{slug}.mdx`에 저장합니다.

## 처리 순서

### 1단계: URL 유형 판별 후 콘텐츠 가져오기

URL 형태에 따라 다른 방법으로 원문을 가져옵니다.

---

#### Velog (`velog.io/@{username}/{url_slug}`)

Velog는 SPA이므로 WebFetch로는 원문을 가져올 수 없습니다. 반드시 **GraphQL API**를 사용합니다.

URL에서 `username`과 `url_slug`를 추출합니다.
예: `https://velog.io/@kkoom/my-post` → username=`kkoom`, url_slug=`my-post`

아래 형식으로 `https://api.velog.io/graphql`에 POST 요청을 보냅니다:

```
POST https://api.velog.io/graphql
Content-Type: application/json

{
  "query": "{ post(username: \"<username>\", url_slug: \"<url_slug>\") { title body tags created_at thumbnail } }"
}
```

- `body`: 원문 Markdown 그대로 사용
- `tags`: 문자열 배열 그대로 사용
- `created_at`: ISO 8601 → `YYYY-MM-DD`로 변환
- `thumbnail`: 있으면 참고용

---

#### Notion 공개 링크 (`notion.so` 또는 `notion.site`)

`WebFetch`로 가져옵니다. Notion 공개 페이지는 정적 HTML로 렌더링됩니다.

- 비공개 페이지라면: "해당 Notion 페이지에 접근할 수 없습니다. 페이지를 공개(Publish to web)로 설정 후 다시 시도해 주세요."

---

#### 그 외 일반 블로그/웹페이지

`WebFetch`로 가져옵니다. 가능한 원문에 가깝게 추출하되, JS 렌더링 페이지는 한계가 있을 수 있음을 사용자에게 안내합니다.

---

### 2단계: 콘텐츠 추출

가져온 데이터에서 다음을 추출합니다:

- **제목**: API의 `title` 또는 페이지의 `<h1>`
- **본문**: API의 `body` (Markdown) 또는 파싱된 텍스트 — **절대 요약하거나 편집하지 않습니다**
- **날짜**: API의 `created_at` 또는 포스트에 명시된 날짜 (없으면 오늘 날짜 `YYYY-MM-DD`)
- **태그**: API의 `tags` 또는 포스트 태그 (없으면 내용 기반 2~4개 추론)
- **description**: 본문 첫 단락을 1~2문장으로 요약 (프론트매터용)
- **이미지**: `![alt](url)` 형식 — Velog는 API body에 이미 포함됨

### 3단계: slug 생성

- 영문 제목: 소문자 + 하이픈 (예: `zustand-deep-dive`)
- 한글 제목: 영어로 번역하여 소문자 + 하이픈 (예: `reactjs-girls-29-meetup`)
- 특수문자 제거
- 이미 파일이 존재하면 사용자에게 알리고 덮어쓸지 확인

### 4단계: MDX 파일 생성

프론트매터 형식:

```mdx
---
title: "포스트 제목"
date: "YYYY-MM-DD"
tags: ["태그1", "태그2"]
description: "포스트 내용을 1~2문장으로 요약한 설명."
---

본문 내용...
```

**본문 변환 규칙:**

- Velog의 경우: API `body` 필드를 **그대로** 붙여넣습니다. 한 글자도 바꾸지 않습니다.
- Notion의 경우: Notion 특유 요소를 Markdown으로 대체합니다.
  - 콜아웃 → `> 블록쿼트`
  - 토글 → 일반 섹션
  - 구분선 → `---`
- 코드 블록은 언어 식별자 포함

### 5단계: 파일 저장 및 결과 보고

```
✅ MDX 파일이 생성되었습니다.

경로: content/posts/{slug}.mdx
제목: {title}
날짜: {date}
태그: {tags}

⚠️ 주의: (해당되는 경우만) 이미지가 외부 CDN URL을 참조합니다.
```

## 오류 처리

| 상황                     | 대응                                                                              |
| ------------------------ | --------------------------------------------------------------------------------- |
| Velog GraphQL 실패       | "Velog API 호출에 실패했습니다. URL을 다시 확인해 주세요."                        |
| Notion 페이지 접근 불가  | "Notion 페이지가 비공개 상태입니다. 'Publish to web' 설정 후 다시 시도해 주세요." |
| 제목을 찾을 수 없음      | 사용자에게 제목을 직접 입력 요청                                                  |
| 이미지가 Notion 내부 URL | "이미지가 Notion 내부 URL이라 외부에서 깨질 수 있습니다." 경고                    |
| 파일 이미 존재           | "이미 `{slug}.mdx` 파일이 존재합니다. 덮어쓰시겠습니까?"                          |
