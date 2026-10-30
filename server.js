const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const scanRoutes = require("./routes/scanRoutes");

const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Malicious Link Detector Backend is Running!");
});

// Health check route
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend is working correctly"
    });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// URL scanning, scan history, and scan deletion routes
app.use("/api/scans", scanRoutes);

// Start server after connecting to MongoDB
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
