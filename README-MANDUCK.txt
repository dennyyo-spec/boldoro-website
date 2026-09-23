BOLDORO /manduck 설정

구성:
- index.html : 기존 홈페이지 본문/디자인의 단일 원본
- functions/manduck.js : /manduck 전용 검색엔진 제목·설명·OG·canonical만 변경

동작:
- https://boldoro.kr/manduck
- https://boldoro.kr/manduck/
두 주소 모두 같은 index.html 내용을 표시합니다.
- index.html을 수정하면 /manduck 화면도 자동으로 동일하게 업데이트됩니다.
- /counseling에는 이 Function이 적용되지 않습니다.
- /manduck 검색용 제목:
  볼도르 BOLDORO | 부산 만덕동 금거래소 · 금매입 · 골드바 · 주얼리
- /manduck 검색용 설명:
  부산 북구 만덕동 BOLDORO 볼도르 주얼리 금거래소. 순금·18K·14K·골드바·치금·은 매입과 골드바 구매, 다이아몬드·주얼리 상담을 제공합니다.

주의:
Cloudflare Pages Functions는 Git 연동 배포에서 functions 폴더를 포함해야 합니다.
