import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";

export default function GoalList({ goals, handleDelete }) {
  return (
    <div>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Goals
      </Typography>
      <List>
        {goals.map((goal) => (
          <ListItem key={goal.id} sx={{ border: "1px solid black" }}>
            <ListItemText
              primary={goal.title}
              secondary={`User: ${goal.userName}`}
              sx={{ padding: "8px" }}
            />
            <ListItemText
              primary={goal.title}
              secondary={`Goal Type: ${goal.goalType}`}
              sx={{ padding: "8px" }}
            />
            <ListItemText
              primary={goal.title}
              secondary={`Description: ${goal.description}`}
              sx={{ padding: "8px" }}
            />
            <ListItemText
              primary={goal.title}
              secondary={`Target Date: ${goal.targetDate}`}
              sx={{ padding: "8px" }}
            />
            <ListItemText
              primary={goal.title}
              secondary={`Status: ${goal.status}`}
              sx={{ padding: "8px" }}
            />
            <Button
              sx={{ margin: "8px" }}
              variant="outlined"
              color="primary"
              onClick={() => handleEdit(goal.id)}
            >
              Edit
            </Button>
            <Button
              sx={{ margin: "8px" }}
              variant="outlined"
              color="secondary"
              onClick={() => handleDelete(goal.id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
