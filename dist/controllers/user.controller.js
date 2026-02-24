"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = void 0;
const user_1 = require("../models/user");
const createUser = async (req, res) => {
    try {
        const { email, username, password, role } = req.body;
        // Check if user with the same email already exists
        const existingUser = await user_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }
        const user = new user_1.User({ email, username, password, role });
        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const users = await user_1.User.find().select("-password");
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getUsers = getUsers;
