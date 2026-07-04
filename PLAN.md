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
| CMS | **Pages CMS** | git-based（repo 即資料庫，無鎖定）、免費、設定最簡、支援圖片上傳 |
| 圖片 | repo 內 | 簡單優先；接近 1GB 時再評估 Cloudflare R2 |
| 網域 | **`blog.catcatcatcat.cc`**（2026-07-05 定案） | 原掛於舊 Jekyll blog「Pixels and Pages」（`catcatcatcat.github.io`），已解綁移轉；舊站仍可從 `catcatcatcat.github.io` 訪問；DNS 原本就指向 GitHub Pages，未變動 |
| 主題 | Astro 官方 blog 模板（非 AstroPaper） | 先求流程通；主題美化屬 Iteration 3 |

## 迭代規劃

### Iteration 1 — 骨架上線

- [x] 建 GitHub repo（public，Pages 需要）— https://github.com/catcatcatcat/catcat-blog
- [x] Astro 初始化（Astro 7.0，官方 blog 模板；主題候選 AstroPaper/Cactus 延後至 Iteration 3）
- [x] GitHub Actions workflow：push main → 建置（`withastro/action@v6`）→ 部署 Pages
- [x] 發第一篇測試文（電腦端），確認上線流程通 — 2026-07-05 上線 https://blog.catcatcatcat.cc/
- [ ] 中文顯示確認（字型、日期格式、RSS）— 內文可顯示，字型與日期格式未調

### Iteration 2 — 手機發文流程

- [ ] 接 Pages CMS（`.pages.yml` 設定 content model：文章、圖片路徑）
- [ ] 手機實測：寫文 → 上傳圖片 → 發布 → 確認自動上線
- [ ] 發文流程文件化（README 補「如何發文」）

### Iteration 3 — 打磨（依需要）

- [ ] About 頁
- [ ] 分類 / 標籤結構（依內容主軸決定）
- [ ] 自訂網域（若決定要）
- [ ] 流量統計（候選：GoatCounter、Umami，免 cookie）

## 未決事項

| 問題 | 影響 | 決定 |
|---|---|---|
| 內容主軸（旅行 / 詩 / 開發學習紀錄？） | 主題選擇、分類結構 | 待定 |
| Blog 名稱 | repo 名、網站標題 | 待定 |
| 文章授權（是否標 CC License） | footer 呈現 | 待定 |

## 風險備忘

- GitHub Pages 網站本體為公開；repo 設 public 表示文章原始檔亦公開（草稿注意）
- Pages CMS 需授權存取 GitHub repo（OAuth），僅授權該 repo 為佳
- Astro 版本迭代快：實作前先確認當下安裝版本的文件，勿憑舊知識寫設定
