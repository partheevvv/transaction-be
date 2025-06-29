const router = require("express").Router();
const auth = require("../middleware/auth");
const { getSummary } = require("../controller/summaryController");

router.get('/', auth, getSummary);

module.exports = router;