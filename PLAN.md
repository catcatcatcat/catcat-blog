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
| 網域 | **`blog.catcatcatcat.cc`**（2026-07-05 定案） | 原掛於舊 Jekyll blog「Pixels and Pages」（`catcatcatcat.github.io`），已解綁移轉；`catcatcatcat.github.io` 首頁已改為自動跳轉到新網域，舊文章頁面保留原地不動；DNS 原本就指向 GitHub Pages，未變動 |
| 主題 | Astro 官方 blog 模板 + 沿用舊站配色字型（2026-07-05） | 站名沿用「Pixels and Pages」；配色（深色底、薄荷綠/青綠/桃紅）與字型（Chakra Petch + Orbitron）直接搬自舊 Jekyll 站 CSS，維持視覺延續性 |

## 迭代規劃

### Iteration 1 — 骨架上線

- [x] 建 GitHub repo（public，Pages 需要）— https://github.com/catcatcatcat/catcat-blog
- [x] Astro 初始化（Astro 7.0，官方 blog 模板；主題候選 AstroPaper/Cactus 延後至 Iteration 3）
- [x] GitHub Actions workflow：push main → 建置（`withastro/action@v6`）→ 部署 Pages
- [x] 發第一篇測試文（電腦端），確認上線流程通 — 2026-07-05 上線 https://blog.catcatcatcat.cc/
- [x] 中文顯示確認（字型、日期格式、RSS）— 內文可正常顯示；Orbitron/Chakra Petch 對中文字自動 fallback，日期格式維持 `Jul 5, 2026` 樣式未中文化
- [x] 主題改版：套用舊站「Pixels and Pages」cyberpunk 配色與字型，清除範本殘留的 Astro 官方連結與佔位文案
- [x] `catcatcatcat.github.io` 舊站首頁改為自動跳轉到新網域

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

---

## Iteration 2 執行規格（2026-07-18 補）

> 目標：手機瀏覽器全程完成「寫文 → 貼圖 → 發布」。步驟固定，執行 agent 不得自創欄位或改主題樣式（樣式屬 Iteration 3）。

### 步驟 0：對齊實際 content schema（動工第一步）

- 讀 repo 的 content collection 設定檔（Astro 7 官方 blog 模板通常在 `src/content.config.ts` 或 `src/content/config.ts`）與一篇既有文章的 front matter。
- `.pages.yml` 的欄位**必須逐字對齊實際 schema**（模板預設：`title`／`description`／`pubDate`／`updatedDate`／`heroImage`）；不得發明新欄位、不得改 schema 遷就 CMS。

### 步驟 1：撰寫 `.pages.yml`

- content 定義：type collection、path 指向實際文章目錄（如 `src/content/blog`）、欄位型別對映（date 欄用 date type、heroImage 用 image type）。
- media 設定：上傳目錄對齊模板圖片實際存放處與引用方式（步驟 0 一併查明），確保 CMS 上傳的圖片路徑能被文章直接引用。
- commit push 後於 Pages CMS 網頁端確認讀得到設定。

### 步驟 2：連接 Pages CMS（使用者親辦）

- pagescms.org 以 GitHub 登入 → **授權範圍只選 `catcat-blog` 單一 repo**（不給 all repositories）。
- agent 不代辦 OAuth；只負責事前說明畫面流程、事後驗證。

### 步驟 3：手機實測 checklist

- [ ] 手機開 Pages CMS → 新增文章（中文標題＋內文）→ 上傳一張照片插入 → 發布
- [ ] GitHub Actions 自動建置成功 → https://blog.catcatcatcat.cc/ 出現新文，圖片正常顯示
- [ ] 再次編輯同文（改字＋換圖）→ 發布 → 上線內容更新
- [ ] 中文 slug／檔名行為確認（若 CMS 產生的檔名不理想，記錄現象回報，不擅自改規則）

### 步驟 4：文件化

- README 補「如何發文」節：手機操作步驟＋圖片注意事項＋失敗排查（Actions 紅燈看哪裡）。

### 守門

- repo 為 public：**草稿也是公開的**，測試文內容注意不要含個資。
- 不動 Iteration 3 範圍（About、標籤、統計）；未決事項（內容主軸、Blog 名稱、授權）仍屬使用者拍板，agent 不得代決。
