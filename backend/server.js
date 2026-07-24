const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/database");

const contactRoutes = require("./routes/contactRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const internRoutes = require("./routes/internRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const taskRoutes = require("./routes/taskRoutes");
const workStatusRoutes = require("./routes/workStatusRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/internship", internshipRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/interns", internRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/work-status", workStatusRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health API
app.get("/api/health", (req, res) => {
  res.json({
    status: "Server Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});