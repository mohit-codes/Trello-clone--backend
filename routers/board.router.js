const express = require("express");
const router = express.Router();
const {
  createBoard,
  findBoard,
  updateBoard,
  deleteBoard,
} = require("../controllers/board.controller");

router.route("/create").post(createBoard);

router.param("userId").post(findBoard);

router.route("/:userId").put(updateBoard).delete(deleteBoard);

module.exports = router;
