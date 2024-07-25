import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: "All users data",
            users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in get all users',
            error,
        });
    }
};

// Register a new user
const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Validation
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all fields',
            });
        }
        // Check for existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: 'User already exists',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Save new user
        const user = new userModel({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).send({
            success: true,
            message: "New user added",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error in register callback',
            success: false,
        });
    }
};

// Login a user
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please provide email and password',
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered',
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Successful login, include user data in response
        return res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error in login function',
            error: error.message,
        });
    }
};

export { getAllUsers, registerController, loginController };
