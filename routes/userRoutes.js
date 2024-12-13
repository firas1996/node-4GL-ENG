const { signup, login } = require("../controllers/authController");
const {
  createUser,
  GetUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const express = require("express");
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.route("/").post(createUser).get(GetUsers);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
