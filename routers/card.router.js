const express = require("express");
const router = express.Router();
const {
  createCard,
  findCard,
  updateCard,
  deleteCard,
  fetchCommentsByCardId,
} = require("../controllers/card.controller");

router.route("/create").post(createCard);
router.route("/comments/:cardId").get(fetchCommentsByCardId);
router.param("cardId", findCard);

router.route("/:cardId").put(updateCard).delete(deleteCard);

module.exports = router;
