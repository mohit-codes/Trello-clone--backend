const express = require("express");
const router = express.Router();
const {
  createBoard,
  findBoard,
  updateBoard,
  deleteBoard,
  getBoardById,
  fetchListsByBoardId,
  fetchBoardsByUserId,
} = require("../controllers/board.controller");

router.route("/create").post(createBoard);
router.route("/lists/:boardId").get(fetchListsByBoardId);
router.param("boardId", findBoard);
router.route("/:userId").get(fetchBoardsByUserId);
router
  .route("/:boardId")
  .get(getBoardById)
  .put(updateBoard)
  .delete(deleteBoard);

module.exports = router;
