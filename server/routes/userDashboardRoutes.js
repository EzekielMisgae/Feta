const express = require("express");
const router = express.Router();
const { userDetails } = require("../controllers/userDashboard");

router.route("/details").post(userDetails);
router.route("/profile").post(userDetails);

module.exports = router;
