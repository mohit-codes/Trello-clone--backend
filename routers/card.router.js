const express = require("express");
const router = express.Router();
const {
  createCard,
  findCard,
  updateCard,
  deleteCard,
} = require("../controllers/card.controller");

router.route("/create").post(createCard);

router.param("cardId", findCard);

router.route("/:cardId").put(updateCard).delete(deleteCard);

module.exports = router;
