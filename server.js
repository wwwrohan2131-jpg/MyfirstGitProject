const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
});

// User Model
const User = mongoose.model("User", userSchema);

// API: Create User
app.post("/api/users", async (req, res) => {
    try {
        const { username } = req.body;

        if (!username || !username.trim()) {
            return res.status(400).json({
                message: "Username is required"
            });
        }

        const newUser = new User({
            username: username.trim()
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully!",
            user: newUser
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});