require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Server is running"})
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/reminders", require("./routes/reminderRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));
app.use("/api/achievements", require("./routes/achievementRoutes"));
app.use("/api/healthstats", require("./routes/healthstatRoutes"));
app.use("/api/healthtips", require("./routes/healthtipsRoutes"));
app.use("/api/schedules", require("./routes/scheduleRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on htttp://localhost:${PORT}`));