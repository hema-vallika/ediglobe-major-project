import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const {username,email,password} = req.body;
    try{
        const existigUser = await User.findOne({email});
        if(existigUser){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: "User registered successfully"});
    }
    catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid password"});
        }
        const token = jwt.sign({id: user._id, username: user.username, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({token, user: {id: user._id, username: user.username, email: user.email}});
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({message: "Login failed",error:error.message});
    }
};