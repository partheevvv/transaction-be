const router = require("express").Router();
const auth = require("../middleware/auth");
const { getTheme, setTheme } = require("../controller/userController");

router.get("/theme", auth, getTheme);
router.put("/theme", auth, setTheme);

module.exports = router;