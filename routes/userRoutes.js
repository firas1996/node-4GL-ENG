const { createUser } = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.route("/").post(createUser);

module.exports = router;
