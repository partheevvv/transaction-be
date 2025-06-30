const router = require("express").Router();
const auth = require("../middleware/auth");
const { body, query, validationResult } = require("express-validator");
const { createTransaction, getTransaction, deleteTransaction, updateTransaction } = require("../controller/transactionController");


const transactionValidators = [
    body("date").exists().withMessage("Date is required").withMessage("Date should be in YYYY-MM-DD format").toDate(),
    body("description").exists().withMessage("Description required").trim().escape(),
    body("amount").exists().withMessage("Amount required").isFloat().toFloat(),
    body("category").exists().withMessage("Category required").trim().escape(),
    body("type").exists().withMessage("Type required").isIn(["Income", "Expense"]).withMessage("Type must be either income or expense").trim().escape(),
];

const checkValidation = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) return res.status(400).json({
        error: error.array()
    });
    next();
}

router.use(auth);

router.post("/", transactionValidators, checkValidation, createTransaction);
router.get("/", getTransaction);
router.delete("/:id", deleteTransaction);
router.put("/:id", transactionValidators, checkValidation, updateTransaction);

module.exports = router;


