# catcat-blog

個人部落格。以「在電腦或手機把 Markdown 與圖片交給 AI，即可預覽或發布」為核心目標；沒有 CMS、資料庫或登入後台。

## 架構

```
對話交稿（Markdown + 圖片）
  → AI 整理文章資料夾、metadata 與圖片
  → Astro schema / type check / build / Pagefind 驗證
  → commit 到 GitHub repo
  → GitHub Actions 自動建置（Astro）
  → 部署到 GitHub Pages
```

| 元件 | 選型 | 角色 |
|---|---|---|
| 靜態網站產生器 | Astro | 把 Markdown 建置成網站 |
| 建置與部署 | GitHub Actions + GitHub Pages | push 即自動上線，免本機環境 |
| 發文介面 | AI-first 對話交稿 | 使用者只需提供 Markdown、圖片與發布意圖 |
| 內容管理 | Astro Content Collections | Markdown schema、型別與建置時驗證 |
| 站內搜尋 | Pagefind | build 後產生靜態中文搜尋索引，無外部服務 |
| 圖片儲存 | 文章資料夾內（`src/content/blog/<slug>/`） | 文章與圖片共同維護，交由 Astro 最佳化 |

## 狀態

🟢 已上線：https://blog.catcatcatcat.cc/ （2026-07-05）

- Repo: https://github.com/catcatcatcat/catcat-blog （push `main` 即自動部署）
- 已具備：Tags、站內搜尋、日期 Archive、AI-first 發文規約
- 待辦：手機附件交稿真機驗收、主題美化與中文字型（Iteration 3）

開發規劃與進度見 [PLAN.md](PLAN.md)。

## 如何交稿

在可存取這個 repo 的 Codex 任務中，上傳 `.md`（或貼上 Markdown）與圖片，接著使用其中一種說法：

- **「先預覽這篇」**：整理文章並產生桌面／手機預覽，不 push。
- **「直接發布這篇」**：驗證通過後 commit、push，確認 GitHub Pages 部署結果。
- **「更新〈文章名稱〉並發布」**：更新既有文章、保留原 URL，加入 `updatedDate`。

可另外指定封面、圖片位置、發布日期與網址 slug。沒指定時，agent 可以整理 description、ASCII slug、圖片檔名、alt text、封面與圖片位置，但不得擅自改寫文章原文。

### Tag 守門

**Tag 只能由站主指定或明確批准。** Agent 可以建議 tag，但未經授權不得把任何 tag 寫入文章或 `src/data/tags.ts`。沒有指定 tag 的文章使用空陣列，不自動分類。

### 圖片與草稿注意事項

- 建議把文章中使用的圖片和 Markdown 一起上傳；若未註明位置，agent 會先在發布摘要列出安排。
- repo 是 public。含個資或尚未準備公開的草稿不得 push。
- 文章 URL 由穩定的 ASCII slug 決定；更新文章時不因標題改動而改 URL。

## 本地開發（選用）

不需要本機環境也能發文。若要本機預覽：

```bash
npm install
npm run dev
```

完整驗證：

```bash
npm run verify
```

`npm run build` 會先由 Astro 產生靜態網站，再由 Pagefind 在 `dist/pagefind/` 建立搜尋索引。搜尋功能要用 production build 預覽，單純的 Astro dev server 不會產生索引。

## 內容結構

```text
src/content/blog/<ascii-slug>/
├── index.md
├── hero.<ext>
└── <descriptive-image-name>.<ext>
```

正式文章 front matter：

```yaml
---
title: 文章標題
description: 一句摘要
pubDate: 2026-08-03
updatedDate: 2026-08-05 # 只有更新時加入
tags: [] # 只填入站主已批准的 tag ID
heroImage: ./hero.jpg # 選填
---
```

網站入口：`/blog/` 文章列表、`/tags/` Tags、`/search/` 搜尋、`/archive/` 日期 Archive。
