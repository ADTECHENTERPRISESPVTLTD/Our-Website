const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/database");

const contactRoutes = require("./routes/contactRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/internship", internshipRoutes);
app.use("/api/newsletter", newsletterRoutes);

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