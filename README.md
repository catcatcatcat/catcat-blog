# catcat-blog

個人部落格。以「手機也能完整發文」為核心目標：Markdown 寫作、圖片直接上傳、零終端機部署。

## 架構

```
寫作（手機 Pages CMS / 電腦編輯器）
  → commit 到 GitHub repo（.md + 圖片）
  → GitHub Actions 自動建置（Astro）
  → 部署到 GitHub Pages
```

| 元件 | 選型 | 角色 |
|---|---|---|
| 靜態網站產生器 | Astro | 把 Markdown 建置成網站 |
| 建置與部署 | GitHub Actions + GitHub Pages | push 即自動上線，免本機環境 |
| 內容管理 | Pages CMS | 手機瀏覽器可用的編輯後台，直接讀寫 repo，支援圖片上傳 |
| 圖片儲存 | repo 內（`src/assets/` 或 `public/`） | 個人 blog 規模足夠；量大再遷移物件儲存 |

## 狀態

🟢 已上線：https://blog.catcatcatcat.cc/ （2026-07-05）

- Repo: https://github.com/catcatcatcat/catcat-blog （push `main` 即自動部署）
- 待辦：Pages CMS 手機發文流程（Iteration 2）、主題美化與中文字型（Iteration 3）

開發規劃與進度見 [PLAN.md](PLAN.md)。

## 本地開發（選用）

不需要本機環境也能發文。若要本機預覽：

```bash
npm install
npm run dev
```
