const { json } = require("express");
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
    // const users = await User.find().where("name").equals(req.query.name);
    let querry = { ...req.query };
    let imposters = ["page", "limit", "sort"];
    imposters.forEach((el) => delete querry[el]);
    // 1) Filtering:
    let querryS = JSON.stringify(querry);
    querryS = querryS.replace(/\b(gt|gte|lt|lte)\b/g, (x) => `$${x}`);
    console.log(querryS);
    let qq = User.find(JSON.parse(querryS));
    // 2) Pagination:
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 2;
    const skip = (page - 1) * limit;
    qq = qq.skip(skip).limit(limit);
    const nbrUsers = await User.countDocuments();
    console.log(nbrUsers);
    if (skip >= nbrUsers) {
      console.log("aaa");
      // throw new Error("This page does not exist !!!");
      res.status(404).json({
        message: "fail",
      });
    }

    // 3) Sorting:
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      qq = qq.sort(sortBy);
    } else {
      qq = qq.sort("-created_at");
    }

    const users = await qq;
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
