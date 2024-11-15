const {
  createUser,
  GetUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.route("/").post(createUser).get(GetUsers);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
