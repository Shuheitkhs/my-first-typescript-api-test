import express, { Request, Response } from "express";
// サーバーの設定と、いつものミドルウェア
const app = express();
const port = 3000;
app.use(express.json());

// メモリ上のデータストア
let items: { id: number; name: string }[] = [];
let currentId = 1;

// 全てのアイテムを取得
app.get("/items", (req: Request, res: Response) => {
  res.status(200).json(items);
});

// 新しいアイテムを追加
app.post("/items", (req: Request, res: Response) => {
  const item = { id: currentId++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

// サーバーの起動
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//
function resetData() {
  items = [];
  currentId = 1;
}

// テストで使用するためにエクスポート
export { app, resetData };
