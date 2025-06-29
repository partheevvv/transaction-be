const router = require("express").Router();
const auth = require("../middleware/auth");
const { exportCsv } = require("../controller/exportController");

router.get("/transactions/csv", auth, exportCsv);

module.exports = router;