const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  fetchBoardsById,
} = require("../controllers/user.controller");

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/boards/:userId").get(fetchBoardsById);
module.exports = router;
