const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 5002;

const goalTypes = require("./data");
app.use(express.json());

let healthGoals = [];

app.post("/goals", async (req, res) => {
  const { userId, goalType, description, targetDate, status } = req.body;

  try {
    // const userProfile = await axios.get(
    //   `http://localhost:5001/profiles/${userId}`
    // );
    const newGoal = {
      id: healthGoals.length + 1,
      userId,
      userName: 'name',  // userProfile.name,
      goalType,
      description,
      targetDate,
      status,
    };
    healthGoals.push(newGoal);
    res.status(201).json(newGoal);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "User profile not found" });
  }
});

app.delete("/goals/:id", (req, res) => {
  const goalId = parseInt(req.params.id);
  const goalIndex = healthGoals.findIndex((goal) => goal.id === goalId);

  if (goalIndex !== -1) {
    healthGoals.splice(goalIndex, 1);
    res.status(200).json({ message: "Goal deleted successfully" });
  } else {
    res.status(404).json({ error: "Goal not found" });
  }
});

app.put("/goals/:id", async (req, res) => {
  const goalId = parseInt(req.params.id);
  const { userId, goalType, description, targetDate, status } = req.body;
  const goalIndex = healthGoals.findIndex((goal) => goal.id === goalId);

  if (goalIndex !== -1) {
    try {
      const userProfile = await axios.get(
        `http://user-profile:3001/profiles/${userId}`
      );
      const updatedGoal = {
        id: goalId,
        userId,
        userName: userProfile.name,
        goalType,
        description,
        targetDate,
        status,
      };
      healthGoals[goalIndex] = updatedGoal;
      res.status(200).json(updatedGoal);
    } catch (error) {
      res.status(500).json({ error: "User profile not found" });
    }
  } else {
    res.status(404).json({ error: "Goal not found" });
  }
});

app.get("/goal-types", (req, res) => {
  res.json(goalTypes);
});

app.get("/goals", async (req, res) => {
  res.json(healthGoals);
});

app.listen(PORT, () => {
  console.log(`Health Goal Service running on port ${PORT}`);
});

module.exports = app;
