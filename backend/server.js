const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

// ✅ NEW: import routes
const authRoutes = require("./routes/authRoutes");

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

// ✅ NEW: connect auth routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});