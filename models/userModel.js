const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required !!!"],
  },
  email: {
    type: String,
    required: [true, "Email is required !!!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Set a valid Email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password is required !!!"],
    minlength: 8,
    // select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Password is required !!!"],
    minlength: 8,
    validate: {
      validator: function (cPass) {
        return cPass === this.password;
      },
      message: "cPss is not valid !!!",
    },
    // select: false,
  },
  age: Number,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  pass_change_time: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  // only run this function if the pass is modified
  if (!this.isModified("password")) return next();
  // we will hach aur password
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  return next();
});

userSchema.methods.verifPassword = async function (cryptedPass, userPass) {
  return await bcrypt.compare(userPass, cryptedPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
