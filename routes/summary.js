const router = require("express").Router();
const auth = require("../middleware/auth");
const { query, validationResult } = require("express-validator");
const { getSummary } = require("../controller/summaryController");

const summaryValidator = [
    query("month").optional().isInt({
        min: 1,
        max: 12
    }).withMessage("Month should be between 1 and 12").toInt(),
    
    query("year").optional().isInt({
        min: 2000
    }).withMessage("year must be a four-digit valid number").toInt()
]

const checkValidation = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) return res.json(400).json({
        error: error.array()
    });
    next;
}

router.get('/', auth, summaryValidator, checkValidation, getSummary);

module.exports = router;