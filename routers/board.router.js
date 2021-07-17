const express = require("express");
const router = express.Router();
const {
  createBoard,
  findBoard,
  updateBoard,
  deleteBoard,
  getBoardById,
} = require("../controllers/board.controller");

router.route("/create").post(createBoard);

router.param("boardId", findBoard);

router
  .route("/:boardId")
  .get(getBoardById)
  .put(updateBoard)
  .delete(deleteBoard);

module.exports = router;
