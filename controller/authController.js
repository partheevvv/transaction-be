const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res, next) => {
    const {
        username,
        email,
        password
    } = req.body;
    try {
        const user = await User.create({
            username, 
            email,
            password
        });
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);
        res.status(201).json({
            token
        })
    } catch (e) {
        next(e);
    }
};

exports.login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);
        res.status(201).json({
            token
        })    
    } catch (e) {
        next(e);
    }
};