const {
  createUser,
  GetUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.route("/").post(createUser);
router.route("/").get(GetUsers);
router.route("/:id").get(getUserById);
router.route("/:id").patch(updateUser);
router.route("/:id").delete(deleteUser);

module.exports = router;
