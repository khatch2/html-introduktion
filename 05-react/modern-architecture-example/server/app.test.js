import request from "supertest";
import app from "./app";
import { describe, it, expect } from "vitest";

describe("GET /api/hello", () => {
  it("responds with 200", async () => {
    const res = await request(app).get("/api/hello");

    expect(res.status).toBe(200);
  });

  it("responds with Hello World!", async () => {
    const expectedMsg = "Hello World!";

    const res = await request(app).get("/api/hello");
    const data = JSON.parse(res.text);

    expect(data).toBeTruthy();
    expect(data).toHaveProperty("msg");
    expect(data).toHaveProperty("counterHello");
    expect(data.msg).toBe(expectedMsg);
  });

  it("responds correct numer of counter for requests", async () => {
    const res1 = await request(app).get("/api/hello");
    const data1 = JSON.parse(res1.text);

    expect(data1).toBeTruthy();
    expect(data1).toHaveProperty("counterHello");
    expect(data1.counterHello).toBe(3);

    const res2 = await request(app).get("/api/hello");
    const data2 = JSON.parse(res2.text);

    expect(data2).toBeTruthy();
    expect(data2).toHaveProperty("counterHello");
    expect(data2.counterHello).toBe(4);

    const res3 = await request(app).get("/api/hello");
    const data3 = JSON.parse(res3.text);

    expect(data3).toBeTruthy();
    expect(data3).toHaveProperty("counterHello");
    expect(data3.counterHello).toBe(5);
  });
});
