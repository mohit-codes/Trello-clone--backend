const express = require("express");
const router = express.Router();
const {
  createComment,
  findComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");

router.route("/create").post(createComment);

router.param("commentId", findComment);

router.route("/:commentId").put(updateComment).delete(deleteComment);

module.exports = router;
