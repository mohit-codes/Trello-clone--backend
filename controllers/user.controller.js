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

module.exports = { login };
