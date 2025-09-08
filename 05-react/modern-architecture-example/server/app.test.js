import request from "supertest";
import app from "./app";
import { describe, it, expect } from "vitest";

describe("GET /api/hello", () => {
  it("responds with 200", async () => {
    const res = await request(app).get("/api/hello");

    expect(res.status).toBe(200);
  });

  it("responds with Hello World!", async () => {
    const res = await request(app).get("/api/hello");

    expect(res.text).toBe("Hello World!");
  });
});
