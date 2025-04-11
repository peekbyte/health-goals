const request = require("supertest");
const app = require("./index");
const axios = require("axios");

jest.mock("axios");

describe("Health Goal API", () => {
  beforeEach(() => {});

  const mockUser = { id: 1, name: "Test User" };
  const newGoal = {
    userId: 1,
    goalType: "sleep",
    description: "Sleep 8 hours",
    targetDate: "2025-05-01",
    status: "Not started",
  };
  it("should create a new health goal", async () => {
    const res = await request(app).post("/goals").send(newGoal);

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(...newGoal);
  });

  it("should return all goals", async () => {
    axios.get.mockResolvedValueOnce({ data: mockUser });
    await request(app).post("/goals").send(newGoal);
    const res = await request(app).get("/goals");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a goal", async () => {
    axios.get.mockResolvedValueOnce({ data: mockUser });
    const createRes = await request(app).post("/goals").send(newGoal);
    const goalId = createRes.body.id;

    const updatedGoal = {
      userId: 1,
      goalType: "evening routine",
      description: "Do meditation",
      targetDate: "2025-05-10",
      status: "In Progress",
    };

    const res = await request(app).put("/goals/1").send(updatedGoal);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(updatedGoal);
  });

  it("should return 404 when updating non-existent goal", async () => {
    const res = await request(app).put("/goals/999").send(newGoal);
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Goal not found" });
  });

  it("should delete a goal", async () => {
    axios.get.mockResolvedValueOnce({ data: { id: 1, name: "Test User" } });
    const createRes = await request(app).post("/goals").send(newGoal);
    const goalId = createRes.body.id;
    const res = await request(app).delete(`/goals/${goalId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Goal deleted successfully" });
  });

  it("should return list of goal types", async () => {
    const res = await request(app).get("/goal-types");
    expect(res.statusCode).toBe(200);
    console.log("res.body", res.body);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
