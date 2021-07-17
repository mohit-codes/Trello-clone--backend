const express = require("express");
const router = express.Router();
const {
  createList,
  findList,
  updateList,
  deleteList,
  getListById,
} = require("../controllers/list.controller");

router.route("/create").post(createBoard);

router.param("boardId", findBoard);

router
  .route("/:boardId")
  .get(getBoardById)
  .put(updateBoard)
  .delete(deleteBoard);

module.exports = router;
