import request from "supertest";
import { app, resetData } from "../src/index";

// テストケースをまとめる
describe("APIのテスト", () => {
  // 各テスト前にitems と currentId をリセット
  beforeEach(() => {
    resetData();
  });

  // getメソッドでリセットされた空の配列を取得
  test("GET /items - 空のリストを取得", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    // 期待したres.bodyが空の配列で合致しているかチェック
    expect(res.body).toEqual([]);
  });

  //  postメソッドで新しいアイテムを追加する
  test("POST /items - 新しいアイテムを追加", async () => {
    const newItem = { name: "アイテム 1" };
    const res = await request(app).post("/items").send(newItem);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 1, ...newItem });
  });

  //  getメソッドで新しいアイテムが追加されたことを確認
  test("GET /items - アイテムが追加されていることを確認", async () => {
    // リセットされているので一旦postを行う
    const newItem = { name: "アイテム 2" };
    await request(app).post("/items").send(newItem);
    // さきほど追加したアイテムが存在するか確認
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, ...newItem }]);
  });
});
