# PLAN — catcat-blog

> 建立日期：2026-07-05。完成項目請打勾保留，作為進度 checklist。

## 需求

| # | 需求 | 驗收標準 |
|---|---|---|
| 1 | Markdown 編輯容易 | 文章就是 repo 裡的 `.md`，front matter 極簡 |
| 2 | 圖片插入方便 | 編輯時可直接上傳圖片，不需手動管理路徑 |
| 3 | 手機友善 | 手機瀏覽器全程完成「寫文 → 貼圖 → 發布」 |
| 4 | 更新部署容易 | push 即上線，全程不需開電腦跑指令 |

## 技術選型與理由

| 決策 | 選擇 | 理由 |
|---|---|---|
| SSG | **Astro** | 現代、Markdown 原生支援佳、主題生態活躍、建置快 |
| Hosting | **GitHub Pages** | 免費、與 repo 同處、Actions 原生整合 |
| 建置 | **GitHub Actions** | 伺服器端建置，發文者不需本機環境 |
| 發文介面 | **AI-first 對話交稿** | 使用者在電腦或手機提供 Markdown 與圖片，由 agent 整理、預覽、驗證與發布；不維護 CMS／後台 |
| 圖片 | repo 內 | 簡單優先；接近 1GB 時再評估 Cloudflare R2 |
| 網域 | **`blog.catcatcatcat.cc`**（2026-07-05 定案） | 原掛於舊 Jekyll blog「Pixels and Pages」（`catcatcatcat.github.io`），已解綁移轉；`catcatcatcat.github.io` 首頁已改為自動跳轉到新網域，舊文章頁面保留原地不動；DNS 原本就指向 GitHub Pages，未變動 |
| 主題 | Astro 官方 blog 模板 + 沿用舊站配色字型（2026-07-05） | 站名沿用「Pixels and Pages」；配色（深色底、薄荷綠/青綠/桃紅）與字型（Chakra Petch + Orbitron）直接搬自舊 Jekyll 站 CSS，維持視覺延續性 |

## 迭代規劃

### Iteration 1 — 骨架上線

- [x] 建 GitHub repo（public，Pages 需要）— https://github.com/catcatcatcat/catcat-blog
- [x] Astro 初始化（Astro 7.0，官方 blog 模板；主題候選 AstroPaper/Cactus 延後至 Iteration 3）
- [x] GitHub Actions workflow：push main → 建置（`withastro/action@v6`）→ 部署 Pages
- [x] 發第一篇測試文（電腦端），確認上線流程通 — 2026-07-05 上線 https://blog.catcatcatcat.cc/
- [x] 中文顯示確認（字型、日期格式、RSS）— 內文可正常顯示；Orbitron/Chakra Petch 對中文字自動 fallback，日期已改用 `zh-TW` 格式
- [x] 主題改版：套用舊站「Pixels and Pages」cyberpunk 配色與字型，清除範本殘留的 Astro 官方連結與佔位文案
- [x] `catcatcatcat.github.io` 舊站首頁改為自動跳轉到新網域

### Iteration 2 — AI-first 發文與內容探索

- [x] 對話交稿流程：Markdown＋圖片 → metadata／路徑整理 → 預覽或直接發布
- [x] 一文一資料夾：文章與圖片共同存放，既有網址不變
- [x] Tags：canonical registry、總覽、文章列表與文章頁 tag chips
- [x] 站內搜尋：Pagefind 靜態索引，支援中文搜尋且只索引正式文章
- [x] Archive：依發布日期分年、可收合的文章清單
- [x] 響應式導覽：文章／Tags／搜尋／Archive／About
- [x] 發文流程文件化：README 與專案 AGENTS.md
- [ ] 手機實際上傳 1 份 Markdown＋2 張圖片做附件鏈路驗收；不成立時才評估 Blog Inbox 備援

### Iteration 3 — 打磨（依需要）

- [ ] About 頁
- [x] 標籤結構與授權邊界（Iteration 2 完成；tag 只由使用者指定或批准）
- [x] 自訂網域（`blog.catcatcatcat.cc`，Iteration 1 完成）
- [ ] 流量統計（候選：GoatCounter、Umami，免 cookie）

## 未決事項

| 問題 | 影響 | 決定 |
|---|---|---|
| 內容主軸（旅行 / 詩 / 開發學習紀錄？） | 主題選擇、分類結構 | 待定 |
| Blog 名稱 | repo 名、網站標題 | 待定 |
| 文章授權（是否標 CC License） | footer 呈現 | 待定 |

## 風險備忘

- GitHub Pages 網站本體為公開；repo 設 public 表示文章原始檔亦公開（草稿注意）
- Astro 版本迭代快：實作前先確認當下安裝版本的文件，勿憑舊知識寫設定

---

## Iteration 2 執行規格（2026-08-03 改版）

> 目標：把 AI 當作操作介面，保留 Markdown＋Git＋Astro 的乾淨靜態架構。使用者只需在對話中交付 Markdown 與圖片；不接 CMS、不建資料庫、不自製登入後台。

### 1. 對話交稿契約

- 接受上傳 `.md`、直接貼上 Markdown，以及同一則或相鄰訊息附上的圖片。
- 預設為「預覽」：agent 整理檔案、補齊技術 metadata、build，提供發布摘要與桌面／手機預覽，但不 push。
- 使用者明確說「直接發布」時，才在驗證通過後 commit、push 並確認部署結果。
- 使用者原文不得因發文流程被擅自潤稿；只處理 front matter、圖片引用、必要格式與明確要求的文字修改。
- 未指定的 description、ASCII slug、圖片檔名、alt text、封面與圖片位置，可由 agent 依原文提出合理方案；有實質歧義才集中詢問。
- **Tag 僅能由使用者指定或明確批准。Agent 可以提供建議，但未經授權不得把新舊 tag 寫入文章或 registry，也不得把推測的 tag 當預設值。**

### 2. 內容與圖片結構

```text
src/content/blog/<ascii-slug>/
├── index.md
├── hero.<ext>
└── <descriptive-image-name>.<ext>
```

- `glob()` loader 以資料夾名產生穩定文章 ID；遷移既有文章時保持原 URL。
- schema 保留 `title`／`description`／`pubDate`／`updatedDate?`／`heroImage?`，新增 `tags` 陣列；未指定 tag 的文章保持空陣列，不由 agent 代填。
- 圖片留在 `src/` 交由 Astro 建置時最佳化；檔名使用可讀的 ASCII kebab-case，Markdown 使用相對路徑。
- 正式發布日以 Asia/Taipei 的 `YYYY-MM-DD` 記錄；更新既有文章才加入 `updatedDate`，URL 不變。

### 3. Tags

- `src/data/tags.ts` 是唯一 canonical registry：穩定 ASCII ID 對應顯示名稱。
- 文章 front matter 儲存 ID；schema 拒絕 registry 不存在的值。
- `/tags/` 顯示所有已核准 tag 與文章數；`/tags/<id>/` 依發布日期由新到舊列文。
- 文章頁顯示 tag chips；agent 不得自動建立近義、拼字變體或任何未授權 tag。

### 4. 站內搜尋

- Pagefind 在 Astro build 後索引 `dist/`，搜尋資源隨 GitHub Pages 靜態部署，不增加 server／API。
- 全站語言標成 `zh-Hant`，使用支援中文／日文斷詞的 extended build。
- 只把文章主體標成可索引區域；首頁、Tags、Archive 等聚合頁不得形成重複結果。
- `/search/` 搜尋標題、description、內文與 tags，並提供符合現有主題的結果介面。

### 5. 日期 Archive 與導覽

- `/archive/` 依 `pubDate` 新到舊，使用原生 `<details>`／`<summary>` 按年份收合；最新年份預設展開。
- Header 提供文章／Tags／搜尋／Archive／About；手機寬度下使用不溢出的響應式導覽。
- 文章頁補 tags、正確圖片 alt、回列表及上一篇／下一篇導覽。

### 6. 驗證與完成條件

- Content schema／type check／production build／Pagefind index 全數通過。
- Tags 數量、tag 文章對應、日期排序與既有文章 URL 正確。
- 中文標題、內文與已授權 tags 可搜尋；聚合頁不出現在結果。
- 390px、768px、1440px 視口無水平溢出，導覽、搜尋、tag chips、Archive 可由觸控與鍵盤操作。
- RSS、sitemap 與 GitHub Pages workflow 維持正常。
- 電腦附件流程由 agent 驗證；手機附件到 repo 的鏈路需在使用者可操作手機時完成一次真機驗收，失敗才設計外部 Blog Inbox。

### 7. 文件與 commit 邊界

- README 記錄人類可讀的交稿指令與失敗排查；專案 AGENTS.md 記錄未來 agent 的發文守門。
- 每篇文章一個內容 commit；功能、樣式、文件不得混入文章 commit。
- repo 為 public：未發布草稿不得 push，測試內容不得含個資。
- 不另建文章產生器 CLI；先以 schema、build 與 agent 規約維持單一工作流。
- 未決事項（內容主軸、Blog 名稱、授權）仍由使用者拍板，agent 不得代決。
