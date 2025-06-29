const router = require("express").Router();
const auth = require("../middleware/auth");
const { createTransaction, getTransaction, deleteTransaction, updateTransaction } = require("../controller/transactionController");

router.use(auth);

router.post("/", createTransaction);
router.get("/", getTransaction);
router.delete("/:id", deleteTransaction);
router.put("/:id", updateTransaction);

module.exports = router;


