import request from "supertest";
import app from "./app";
import { describe, it, expect } from "vitest";

describe("GET /api/hello", () => {
  it("responds with 200 and Hello Wrold!", async () => {
    const res = await request(app).get("/api/hello");

    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello World!");
  });
});
