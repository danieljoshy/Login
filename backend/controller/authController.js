const User = require("../models/user"); // Make sure this matches your exact filename
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const {
            fullname, username, password, email, pan, dob,
            mobile, adhaar, role, specialisation, address, gender
        } = req.body;

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            fullname, username, password: hashedPassword, email, pan, dob,
            mobile, adhaar, role, specialisation, address, gender
        });

        await user.save();

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Invalid Username or Password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Username or Password" });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login Successful",
            token,
            role: user.role // Sends the role back to React for routing
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Export the functions using CommonJS syntax
module.exports = {
    registerUser,
    userLogin
};