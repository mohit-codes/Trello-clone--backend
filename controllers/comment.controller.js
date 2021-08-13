const { extend } = require("lodash");
const Card = require("../models/card.model");
const Comment = require("../models/comment.model");
const createComment = async (req, res) => {
  try {
    const { content, cardId, author } = req.body;
    const comment = new Comment({
      content: content,
      cardId: cardId,
      author: author,
    });
    const savedComment = await comment.save();
    await Card.updateOne(
      { _id: cardId },
      { $push: { comments: savedComment._id } }
    );

    res.status(201).json({
      success: true,
      message: "Comment added",
      comment: savedComment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const findComment = async (req, res, next, commentId) => {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw Error("Unable to fetch the Comment");
    }
    req.comment = comment;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Unable to retrieve the Comment" });
  }
};

const updateComment = async (req, res) => {
  let { comment } = req;
  const commentUpdate = req.body;
  if (commentUpdate._id || commentUpdate.author) {
    return res.status(400).json({
      success: false,
      message: "Forbidden request, comment id and author cannot be updated.",
    });
  }
  comment = extend(comment, commentUpdate);
  comment = await comment.save();
  res.json({ success: true, comment: comment });
};

const deleteComment = async (req, res) => {
  const { comment } = req;
  const { cardId } = comment;
  await Card.updateOne({ _id: cardId }, { $pull: { comments: comment._id } });
  comment
    .delete()
    .then(() => {
      return res.json({ success: true, message: "comment deleted" });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

module.exports = {
  createComment,
  deleteComment,
  findComment,
  updateComment,
};
