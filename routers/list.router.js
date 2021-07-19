const express = require("express");
const router = express.Router();
const {
  createList,
  findList,
  updateList,
  deleteList,
  getListById,
  fetchCardsByListId,
} = require("../controllers/list.controller");

router.route("/create").post(createList);
router.route("/cards/:listId").get(fetchCardsByListId);
router.param("listId", findList);

router.route("/:listId").get(getListById).put(updateList).delete(deleteList);

module.exports = router;
