# 3D Fridge Model Viewer 🧊

這是一個用來紀念我家服役多年的冰箱的 3D 模型瀏覽器。使用 Three.js 建立，讓這台忠實的家電以 3D 模型的形式永存。

## 功能特色 ✨

- 3D 模型即時渲染與檢視
- 互動式操作介面：
  - 左鍵拖曳：旋轉視角
  - 右鍵拖曳：平移視角
  - 滾輪：縮放
- 支援觸控設備（可使用雙指操作）
- 高品質光影效果
- 自適應視窗大小

## 技術規格 🛠

- Three.js
- ES6+ JavaScript
- HTML5
- 使用 OBJ 和 MTL 格式的 3D 模型

## 在本地運行 💻

1. 克隆倉庫：
```bash
git clone https://github.com/[你的使用者名稱]/fridge-3d-viewer.git
```

2. 進入專案目錄：
```bash
cd fridge-3d-viewer
```

3. 啟動本地伺服器（需要安裝 Node.js）：
```bash
npx serve .
```

4. 在瀏覽器中打開 `http://localhost:3000`

## 專案結構 📁

```
fridge-3d-viewer/
├── index.html          # 主要 HTML 文件
├── main.js            # Three.js 主程式碼
├── model/             # 3D 模型文件
│   ├── model.mtl      # 材質文件
│   └── model.obj      # 3D 模型文件
└── README.md          # 專案說明文件
```

## 致謝 🙏

感謝這台冰箱多年來的服務，陪伴我們度過無數個日日夜夜。願這個 3D 模型能永遠保存它的樣貌，紀念它為我們家付出的一切。

## 授權 📝

此專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 文件