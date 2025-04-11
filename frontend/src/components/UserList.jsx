import { List, ListItem, ListItemText, Typography } from "@mui/material";

export default function UserList({ users }) {
  return (
    <div>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Users
      </Typography>
      <List>
        {users.map((user, index) => (
          <ListItem key={user.id} key={index}>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
