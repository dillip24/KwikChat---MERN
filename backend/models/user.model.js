import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your full name"]
    },
    username: {
        type: String,
        required: [true, "Please enter your username"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false
    },
    gender: {
        type: String,
        enum:["male", "female"],
        required: [true, "Please select your gender"]
    },
    profilePicture: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};



userSchema.methods.generateTokens = function (res) {
    const accessToken = jwt.sign(
        {
            id: this._id,
            username: this.username,
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY,
        }
    );

    res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    });

    return {
        accessToken
    };
};

export const User = mongoose.model("User", userSchema);