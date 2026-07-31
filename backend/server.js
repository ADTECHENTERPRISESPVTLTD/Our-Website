const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

const connectDB = require("./config/database");

// Intern Portal Routes
const contactRoutes = require("./routes/contact.routes");
const internshipRoutes = require("./routes/internshipRoutes");
const newsletterRoutes = require("./routes/newsletter.routes");
const internRoutes = require("./routes/internRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const taskRoutes = require("./routes/taskRoutes");
const workStatusRoutes = require("./routes/workStatusRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");

// Main Website Routes
const requirementRoutes = require("./routes/requirementRoutes");
const callbackRoutes = require("./routes/callbackRoutes");
const careerRoutes = require("./routes/careerRoutes");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(helmet()); 
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);

// Main Website Route Bindings
app.use("/api/requirements", requirementRoutes);
app.use("/api/callback", callbackRoutes);
app.use("/api/careers", careerRoutes);

// Intern Portal Route Bindings
app.use("/api/contact", contactRoutes);
app.use("/api/internship", internshipRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/interns", internRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/work-status", workStatusRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Root / Health API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AD TECH Backend API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "Server Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});