// src/App.tsx
import { useEffect, useState } from "react";
import { getUsers, getGoals, deleteGoal } from "./api";
import GoalForm from "./components/GoalForm";
import UserList from "./components/UserList";
import GoalList from "./components/GoalList";

import { Container, Tabs, Tab, Box } from "@mui/material";

function App() {
  const [users, setUsers] = useState([]);
  const [goals, setGoals] = useState([]);
  const [goalTypes, setGoalTypes] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const fetchData = async () => {
    const u = await getUsers();
    const g = await getGoals();
    setUsers(u.data);
    setGoals(g.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleDelete = async (goalId: string) => {
    try {
      await deleteGoal(goalId);
      fetchData();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <h1>Health Goals</h1>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Users" />
        <Tab label="Health Goals" />
      </Tabs>

      {tabIndex === 0 && (
        <Box sx={{ mt: 4 }}>
          <UserList users={users} />
        </Box>
      )}

      {tabIndex === 1 && (
        <Box sx={{ mt: 4 }}>
          <GoalForm users={users} onCreate={fetchData} />
          <GoalList
            goals={goals}
            goalTypes={goalTypes}
            handleDelete={handleDelete}
          />
        </Box>
      )}
    </Container>
  );
}

export default App;
