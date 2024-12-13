const {
  signup,
  login,
  protectorMW,
  checkRoleMW,
} = require("../controllers/authController");
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
router
  .route("/")
  .post(protectorMW, createUser)
  .get(protectorMW, checkRoleMW("admin", "user"), GetUsers);
router
  .route("/:id")
  .get(protectorMW, getUserById)
  .patch(protectorMW, updateUser)
  .delete(protectorMW, deleteUser);

module.exports = router;
