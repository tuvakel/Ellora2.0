require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config.db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Server is running"})
});

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on htttp://localhost:${PORT}`));