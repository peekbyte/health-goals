const request = require("supertest");
const app = require("./index");

describe("User Profile API", () => {
  it("should get all user profiles", async () => {
    const res = await request(app).get("/profiles");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get a user profile by ID", async () => {
    const res = await request(app).get("/profiles/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Hassan");
  });

  it("should return 404 for a non-existent user", async () => {
    const res = await request(app).get("/profiles/999");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "User profile not found");
  });
});
