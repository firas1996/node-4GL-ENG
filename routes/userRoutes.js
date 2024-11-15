const {
  createUser,
  GetUsers,
  getUserById,
  updateUser,
} = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.route("/").post(createUser);
router.route("/").get(GetUsers);
router.route("/:id").get(getUserById);
router.route("/:id").patch(updateUser);

module.exports = router;
