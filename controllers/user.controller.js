const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (user) {
    const isPasswordCorrect = bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const token = jwt.sign({ id: user._id, name: user.name }, secret);
      return res.json({
        user: user,
        success: true,
        message: "Login Successful.",
        token,
      });
    }
    return res.json({
      user: null,
      success: false,
      message: "Invalid Password, please try again.",
    });
  }
  return res.json({
    user: null,
    success: false,
    message: "No account found with entered username.",
  });
};

const signup = async (req, res) => {
  try {
    const { username, email, passowrd } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      return res.json({
        status: false,
        message: "Account with email already exists, Try loggin in instead!",
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(passowrd, 10);
      const newUser = new User({ username, email, hashedPassword });
      const savedUser = await User.save(newUser);
      const token = jwt({ _id: savedUser._id }, secret);

      res.json({ status: true, message: "Signed up successfully." });
    } catch (error) {
      console.log(error);
      res.json({ status: true, message: "Something went wrong!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: true, message: "An unexpected error occured." });
  }
};

module.exports = { login };
