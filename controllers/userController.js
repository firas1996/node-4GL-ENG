const { json } = require("express");
const User = require("../models/userModel");
const APIFeatures = require("../utils/APIFeatures");

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
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .pagination();
    const users = await features.queryData;
    if (users.length === 0) {
      res.status(400).json({
        message: "page not found !!!",
      });
    }
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

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(203).json({
      message: "User Deleted !",
    });
  } catch (err) {
    res.status(400).json({
      message: "fail",
      err: err,
    });
  }
};
