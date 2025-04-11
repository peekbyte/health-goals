import { useState, useEffect } from "react";
import { createGoal, getGoalTypes } from "../api";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function GoalForm({ users, onCreate }) {
  const [goalTypes, setGoalTypes] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    goalType: "",
    description: "",
    targetDate: "",
    status: "Not Started",
  });

  useEffect(() => {
    const fetchGoalTypes = async () => {
      try {
        const res = await getGoalTypes();
        setGoalTypes(res);
      } catch (error) {
        console.error("Error fetching goal types:", error);
      }
    };

    fetchGoalTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createGoal(formData);
    onCreate();
    setFormData({
      userId: "",
      goalType: "",
      description: "",
      targetDate: "",
      status: "Not Started",
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ my: 3 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>User</InputLabel>
        <Select
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Goal Type</InputLabel>
        <Select
          name="goalType"
          value={formData.goalType}
          onChange={handleChange}
          required
        >
          {goalTypes.map((goal) => (
            <MenuItem key={goal.id} value={goal.title}>
              {goal.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        type="date"
        name="targetDate"
        label="Target Date"
        InputLabelProps={{ shrink: true }}
        value={formData.targetDate}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <MenuItem value="Not Started">Not Started</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Finished">Finished</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" type="submit">
        Save
      </Button>
    </Box>
  );
}
