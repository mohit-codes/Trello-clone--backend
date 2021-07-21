const { extend } = require("lodash");
const Card = require("../models/card.model");
const Comment = require("../models/comment.model");
const List = require("../models/list.model");
const createCard = async (req, res) => {
  try {
    const { title, description, listId } = req.body;
    const card = new Card({
      title: title,
      description: description,
      listId: listId,
    });
    const savedCard = await card.save();
    await List.updateOne({ _id: listId }, { $push: { cards: savedCard._id } });

    res.status(201).json({
      success: true,
      message: "Card created",
      cardId: savedCard._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const findCard = async (req, res, next, cardId) => {
  try {
    const card = await Card.findById(cardId);
    if (!card) {
      throw Error("Unable to fetch the card");
    }
    req.card = card;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Unable to retrieve the card" });
  }
};

const getCardById = async (req, res) => {
  const { card } = req;
  res.status(200).json({ success: true, card: card, message: "card found" });
};

const updateCard = async (req, res) => {
  let { card } = req;
  const cardUpdate = req.body;
  if (cardUpdate._id || cardUpdate.listId) {
    return res.status(400).json({
      success: false,
      message: "Forbidden request, card id or user ref cannot be updated.",
    });
  }
  card = extend(card, cardUpdate);
  card = await card.save();
  res.json({ success: true, card: card });
};

const deleteCard = async (req, res) => {
  const { card } = req;
  const { listId } = card;
  await List.updateOne({ _id: listId }, { $pull: { cards: card._id } });
  //below line for deleting all comments
  await Comment.deleteMany({ cardId: card._id }).catch((err) =>
    console.log(err)
  );
  card
    .delete()
    .then(() => {
      return res.json({ success: true, message: "Card deleted" });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

const fetchCommentsByCardId = async (req, res) => {
  const cardId = req.params.cardId;
  const { comments } = await Card.findById(cardId);
  const data = await Comment.find({ _id: { $in: comments } }).catch((err) =>
    console.log(err)
  );
  return res.status(200).json({ success: true, Comment: data });
};

module.exports = {
  createCard,
  deleteCard,
  findCard,
  updateCard,
  getCardById,
  fetchCommentsByCardId,
};
