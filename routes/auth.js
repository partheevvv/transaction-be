const router = require("express").Router();
const { register, login } = require("../controller/authController");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const registrationValidator = [
    body("username").notEmpty().withMessage("Name is required").trim().escape(),
    
    body("email").isEmail().withMessage("Must be a valid email").normalizeEmail().custom(async (email) => {
        const exists = await User.findOne({
            email
        });
        if(exists) {
            throw new Error("Email already in use");
        }
        return true;
    }),

    body("password").isLength({
        min: 8
    }).withMessage("Password must be atleast 6 characters")
]

const loginValidator = [
    
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),

    body("password").notEmpty().withMessage("Password is required")
]

const checkValidation = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        });
    }
    next();
}

router.post("/register", registrationValidator, checkValidation, register);
router.post("/login",loginValidator, checkValidation, login);

module.exports = router;