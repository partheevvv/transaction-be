const router = require("express").Router();
const auth = require("../middleware/auth");
const { getCategorySummary } = require("../controller/analyticsController");

router.get("/category-summary", auth, getCategorySummary);

module.exports = router;
