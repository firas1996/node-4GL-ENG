const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: "User Created !!!",
      data: { newUser },
    });
  } catch (err) {
    res.status(400).json({
      message: "fail",
      err: err,
    });
  }
};

// Get All Users

exports.GetUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users Fetched !",
      data: { users },
    });
  } catch (err) {
    res.status(400).json({
      message: "fail",
      err: err,
    });
  }
};

// Get user by id

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      message: "User Fetched !",
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      message: "fail",
      err: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "User Updated !",
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      message: "fail",
      err: err,
    });
  }
};
