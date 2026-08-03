# catcat-blog Handoff

## 專案狀態

- Iteration 2 的 AI-first 發文基礎已完成：一文一資料夾、Tags、Pagefind 站內搜尋、日期 Archive、響應式導覽與發文文件均已落地。
- Tag registry 目前刻意保持空白；既有文章為 `tags: []`。Schema 會拒絕未登錄 tag，未經貓貓國王明確指定或批准不得寫入新舊 tag。
- `npm run verify` 涵蓋 Astro type check、production build、Pagefind 索引與 4 項建置輸出測試；另已用 390／768／1440 px 視口驗收導覽、搜尋、文章、Tags 與 Archive，無水平溢出，搜尋可命中中文測試文章。

## 決策記錄

- 不採 CMS、資料庫或自製後台；Markdown、圖片與 Git repo 是內容唯一真相，AI 對話是操作介面。
- 文章採 `src/content/blog/<ascii-slug>/index.md`，圖片與文章同資料夾；既有 `/blog/<slug>/` URL 不變。
- 預設交稿語意是「先預覽」，只有貓貓國王明確說「直接發布」才 commit、push 並確認部署。
- AI 可建議 tag，但不能自行建立、沿用或寫入任何 tag；`src/data/tags.ts` 是唯一已批准 tag registry。
- 搜尋採靜態 Pagefind，只索引正式文章；Archive 採原生 `details/summary`，避免額外前端狀態與維護成本。

## 下一步

1. 等貓貓國王用手機在 Codex 任務上傳 1 份 Markdown＋2 張圖片，說「先預覽這篇」，驗收附件能否完整進入 repo 並產生預覽。
2. 若手機附件鏈路失敗，再依實際失敗點評估最小化 Blog Inbox；在此之前不增加 CMS 或第三方後台。
