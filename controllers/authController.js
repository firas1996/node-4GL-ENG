const User = require("../models/userModel");

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      age: req.body.age,
    });
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and pass are required !!!",
      });
    }
    // 1) bech nthabat el user mawjoud wala lé && pass s7ii7
    const user = await User.findOne({ email });
    if (!user || !user.verifPassword(user.password, password)) {
      return res.status(400).json({
        message: "email or password are incorrect !!!",
      });
    }
    res.status(201).json({
      message: "User logged in !!!",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      message: "fail",
      err: error,
    });
  }
};
