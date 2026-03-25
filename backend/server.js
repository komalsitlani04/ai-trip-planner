const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");  // ✅ NEW

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("AI Trip Planner Server Running 🚀");
});

app.get("/test", (req, res) => {
  res.json({ message: "Backend working perfectly 🚀" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);  // ✅ NEW

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});