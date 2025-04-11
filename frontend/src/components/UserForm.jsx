import { useState } from "react";
import { createUser } from "../api";
import { TextField, Button, Box } from "@mui/material";

export default function UserForm({ onCreate }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({ name });
    setName("");
    onCreate();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ my: 2 }}>
      <TextField
        label="User Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{ mr: 2 }}
      />
      <Button type="submit" variant="contained">
        Add User
      </Button>
    </Box>
  );
}
