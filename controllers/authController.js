const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const createToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.SECRET_KEY, {
    expiresIn: "15d",
  });
};

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
    if (!user || !(await user.verifPassword(user.password, password))) {
      return res.status(400).json({
        message: "email or password are incorrect !!!",
      });
    }
    const token = createToken(user._id, user.name);
    res.status(201).json({
      message: "User logged in !!!",
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "fail",
      err: error,
    });
  }
};

exports.protectorMW = async (req, res, next) => {
  try {
    let token;

    // 1) bech nthabat ken el user 3ando token or not
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        message: "ypu are not logged in !!!",
      });
    }
    // 2) bech nthabat ken el token ala 3ana valid or not

    const verified = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    console.log(verified);
    // 3) bech t'thabat ken el user tfasa5 wala mizel mawjoud

    const theUser = await User.findById(verified.id);
    if (!theUser) {
      return res.status(401).json({
        message: "token no longer valid !!!",
      });
    }
    // 4) bech nthabtou ken el token tsan3et 9bal ma yetbadal el pass

    if (theUser.dateChangePass(verified.iat)) {
      return res.status(401).json({
        message: "token no longer valid !!!",
      });
    }
    req.role = theUser.role;
    next();
  } catch (error) {
    res.status(400).json({
      message: "fail",
      err: error,
    });
  }
};

exports.checkRoleMW = (...roles) => {
  return async (req, res, next) => {
    try {
      //   console.log(req.role);
      if (!roles.includes(req.role)) {
        return res.status(401).json({
          message: "you can not do this !!!",
        });
      }

      next();
    } catch (error) {
      res.status(400).json({
        message: "fail",
        err: error,
      });
    }
  };
};
