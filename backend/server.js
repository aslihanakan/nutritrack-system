require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

require("./database");

const authRoutes = require("./routes/authRoutes");
const mealRoutes = require("./routes/mealRoutes");
const goalRoutes = require("./routes/goalRoutes");
const reportRoutes = require("./routes/reportRoutes");
const profileRoutes = require("./routes/profileRoutes");
const waterRoutes = require("./routes/waterRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const {
    swaggerUi,
    swaggerSpec
} = require("./swagger");

const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, "../frontend")));


app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/water", waterRoutes);


app.get("/api/status", (req, res) => {
    res.json({
        message: "NutriTrack API is running"
    });
});


app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user
    });
});


app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Frontend available at http://localhost:${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});