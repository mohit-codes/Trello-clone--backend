const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv");
const authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
 token = token.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request, Token not found.",
      });
    }
    // eslint-disable-next-line no-undef
    const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedValue.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request, Either user not found or invalid token",
      });
    }
    req.user = { id: decodedValue._id, username: decodedValue.username };
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, errMessage: err });
  }
};

module.exports = authenticate;
