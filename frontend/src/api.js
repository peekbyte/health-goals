import axios from "axios";

const API_URL = "http://localhost:8080";

export const getUsers = () => axios.get(`${API_URL}/user-profile/profiles`);
export const createUser = (data) =>
  axios.post(`${API_URL}/user-profile/profiles`, data);

export const getGoals = () => axios.get(`${API_URL}/health-goal/goals`);

export const getGoalTypes = async () => {
  try {
    const response = await fetch(`${API_URL}/health-goal/goal-types`);
    if (!response.ok) {
      throw new Error("Failed to fetch goal types");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching goal types:", error);
    throw error;
  }
};

export const createGoal = (data) =>
  fetch(`${API_URL}/health-goal/goals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteGoal = (goalId) =>
  fetch(`${API_URL}/health-goal/goals/${goalId}`, {
    method: "DELETE",
  });

export const updateGoalStatus = (goalId, status) =>
  fetch(`${API_URL}/health-goal/goals/${goalId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
