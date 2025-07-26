const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Login endpoint
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User Not Found"});

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Ivalid Credentials!!!"});

        const token = jwt.sign({ id: user._id, email: user.email},
            process.env.JWT_SECRET,{
                expiresIn: '1h'
            }
        );
        res.json({ token });
    } catch (error) {
        console.error('Login Error', error);
        res.status(500).json({ message: "Server error during Login"});
    }
}

// Signup Endpoint Logic
exports.signup = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            age,
            gender,
            healthGoals,
            terms,
            newsletter
        } = req.body;

        // Check if user already exists by email
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(400).json({ message: "Email already exists" });

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashed,
            age,
            gender,
            healthGoals,
            terms,
            newsletter
        });

      const token = jwt.sign({ id: user._id, email: user.email},
            process.env.JWT_SECRET,{
                expiresIn: '1h'
        });

        res.json({ token });
    } catch (error) {
        console.error('Signup Error', error);
        res.status(500).json({ message: "Server error during signup" });
    }
};