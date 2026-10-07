const express = require("express");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Authenticate Routes
app.use("/api/auth", authRoutes);

// Routes
app.use("/api/users", userRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
