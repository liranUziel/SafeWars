const aysncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Generate Token
const TokenGenertor = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc get user data
// @route GET /users/user
// @access Private
const getUser = aysncHandler(async (req, res) => {
  const { _id, realName, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    realName,
    email,
    message: "get user",
  });
});

// @desc register user info
// @route POST /users
// @access Public
const registerUser = aysncHandler(async (req, res) => {
  const { realName, userName, email, password } = req.body;

  if (!realName || !userName || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //Cheak if user exist
  const userExist = await User.findOne({ userName });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    realName,
    userName,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.realName,
      email: user.email,
      token: TokenGenertor(user.id),
      message: "register sucsecfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user daua");
  }
});

// @desc login user info
// @route POST /users/login
// @access Public
const loginUser = aysncHandler(async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //Check for user name and password
  const user = await User.findOne({ userName });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.realName,
      email: user.email,
      token: TokenGenertor(user.id),
      message: "login sucsecfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  getUser,
  registerUser,
  loginUser,
};
