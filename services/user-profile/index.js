const express = require("express");
const app = express();
const PORT = 5001;

app.use(express.json());

let userProfiles = [
  { id: 1, name: "Hassan" },
  { id: 1, name: "Sara" },
];

app.get("/profiles", (req, res) => {
  res.json(userProfiles);
});

app.get("/profiles/:userId", (req, res) => {
  const { userId } = req.params;
  const userProfile = userProfiles.find(
    (profile) => profile.id === parseInt(userId)
  );
  if (userProfile) {
    res.json(userProfile);
  } else {
    res.status(404).json({ message: "User profile not found" });
  }
});

app.listen(PORT, () => {
  console.log(`User Profile Service running on port ${PORT}`);
});

module.exports = app;
