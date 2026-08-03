# catcat-blog Handoff

## 專案狀態

- Iteration 2 已完成：一文一資料夾、Tags、Pagefind 搜尋、日期 Archive、響應式導覽與 AI-first 發文流程均已落地；貓貓國王於 2026-08-04 驗收整套流程通過，不需要 Blog Inbox／CMS。
- Tag registry 目前刻意保持空白；既有文章為 `tags: []`。Schema 會拒絕未登錄 tag，未經貓貓國王明確指定或批准不得寫入新舊 tag。
- 2026-08-04 以貼上的 Markdown＋2 張對話圖片完成「附件 → repo → build → 390／1440 px 預覽 → 完整頁截圖」實測；`npm run verify` 為 0 errors／0 warnings、4/4 tests。Codex 看不到訊息來源裝置，流程通過不等於裝置鑑別。
- 測試稿 `src/content/blog/japan-sangoku-30km-bike-ride/` 只留本機且未追蹤，貓貓國王已明確說不公開；**不得 stage、commit 或 push**。預覽截圖在 `/Users/catcatcatcat/.codex/visualizations/2026/08/03/019fc816-c748-78c2-9a2c-0db54617a716/blog-preview-full-page.png`。
- 正式站與 `origin/main` 仍停在 `11b0554`，只有原本已發布的測試文章；`.claude/` 也是既有未追蹤內容，不得混入 commit。

## 決策記錄

- 不採 CMS、資料庫或自製後台；Markdown、圖片與 Git repo 是內容唯一真相，AI 對話是操作介面。
- 文章採 `src/content/blog/<ascii-slug>/index.md`，圖片與文章同資料夾；既有 `/blog/<slug>/` URL 不變。
- 預設交稿語意是「先預覽」，只有貓貓國王明確說「直接發布」才 commit、push 並確認部署。
- AI 可建議 tag，但不能自行建立、沿用或寫入任何 tag；`src/data/tags.ts` 是唯一已批准 tag registry。
- 搜尋採靜態 Pagefind，只索引正式文章；Archive 採原生 `details/summary`，避免額外前端狀態與維護成本。
- 預覽稿不因「驗收通過」自動公開；只有明確收到「直接發布這篇」才建立文章 commit、push 並確認 Pages 部署。
- Archive 測試不得把文章數寫死；計數應由建置輸出的該年份文章數推導，避免每新增一篇就誤報失敗。

## 下一步

1. 專案目前可直接使用；下一篇正式文章依需求說「先預覽這篇」或「直接發布這篇」。未明確說直接發布時一律只做本機預覽。
2. 本次日本三國測試稿維持本機未追蹤狀態，直到貓貓國王另行要求保留、改寫或刪除；任何後續批次 stage 都必須明確排除它。
