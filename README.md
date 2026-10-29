# 환경자원순환연구실 홈페이지

동아대학교 환경자원순환연구실(ERC LAB) 홈페이지입니다. 사이트 주소: https://zoqlsqkr.github.io/ERC/

## 내용 수정하기 (코딩 없이)

1. https://app.pagescms.org 에 접속해 깃허브 계정으로 로그인합니다.
2. `zoqlsqkr/ERC` 저장소를 선택합니다.
3. 왼쪽 메뉴에서 수정할 항목을 고릅니다.
   - 연구실 소식 · 공지사항 / 사진
   - 연구 성과 · 논문 / 연구과제 / 특허
   - 구성원
4. 내용을 고치거나 **Add an entry**로 새 항목을 추가하고 **Save**를 누릅니다.
5. 1~2분 뒤 사이트에 반영됩니다.

## 파일 구성

| 파일 | 내용 |
|---|---|
| `data/*.json` | 공지, 사진, 논문, 과제, 특허, 구성원 데이터 (Pages CMS가 수정) |
| `.pages.yml` | Pages CMS 입력 화면 설정 |
| `*.html`, `styles.css` | 페이지 구조와 디자인 |
| `site-data.js`, `achievements.js`, `members.js`, `news-view.js` | 데이터를 읽어 화면에 그리는 스크립트 |
| `images/` | 이미지 (`news/` 소식 사진, `members/` 구성원 사진, `research/` 연구 분야 사진) |

## 내 컴퓨터에서 미리보기

데이터를 `fetch`로 불러오기 때문에 HTML 파일을 더블클릭해서 열면 목록이 비어 보입니다.
VS Code의 **Live Server** 확장으로 열면 정상적으로 보입니다.
