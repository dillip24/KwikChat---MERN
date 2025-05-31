import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";


export const signup = async (req, res) => {
    try {
        console.log("Signup request body:", req.body);
        const { fullName, username, password, confirmPassword, gender } = req.body;

        // Validate passwords
        if (password !== confirmPassword) {
            console.log("Passwords do not match");
            return next(new apiError(400, "Passwords do not match"));
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("User already exists:", username);
            return next(new apiError(400, "User already exists"));
        }


        // Generate profile picture URL
        const profilePicture =
            gender === "male"
                ? `https://avatar.iran.liara.run/public/boy?username=${username}`
                : `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create new user
        const newUser = await User.create({
            fullName,
            username,
            password,
            gender,
            profilePicture,
        });

        console.log("New user created:", newUser);

        if (newUser) {
            // Generate tokens (ensure this method is implemented in your User model)
            const tokens = await newUser.generateTokens(res);
            await newUser.save();

            console.log("New user saved to DB");

            return res.status(201).json(
                new apiResponse(201, "User created successfully", {
                    user: newUser,
                    tokens,
                })
            );
        } else {
            return next(new apiError(500, "Invalid user data"));
        }
    } catch (error) {
        console.error("Signup error:", error);
        return next(new apiError(500, "Unable to create user"));
    }
};

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username }).select("+password");
        if (!user) {
            console.log("User not found:", username);
            return next(new apiError(404, "User not found"));
        }
        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            console.log("Invalid password for user:", username);
            return next(new apiError(401, "Invalid password"));
        }
        // Generate tokens
        const tokens = await user.generateTokens(res);
        console.log("Tokens generated for user:", username , tokens);
        
        await user.save();  
        console.log("User logged in successfully:", user);
        return res.status(200).json(
            new apiResponse(200, "User logged in successfully", {
                user,
                tokens,
            })
        );
    } catch (error) {
        console.error("Login error:", error);
        return next(new apiError(500, "Unable to login"));
    }
}

export const logout = async (req, res) => {
    try {
        // Clear authentication tokens or session
        res.clearCookie("token"); // Example: clearing a token cookie
        console.log("User logged out successfully");
        return res.status(200).json(new apiResponse(200, "User logged out successfully"));
    } catch (error) {
        console.error("Logout error:", error);
        return next(new apiError(500, "Unable to logout"));
    }
}