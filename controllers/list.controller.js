const List = require("../models/list.model");
const { extend } = require("lodash");
const Board = require("../models/board.model");
const Card = require("../models/card.model");

const createList = async (req, res) => {
  try {
    const { title, boardId } = req.body;
    const list = new List({
      title,
      boardId,
    });
    const savedList = await list.save();

    const board = await Board.findById(boardId);
    board.lists.push(savedList);
    await board.save();

    res.status(201).json({
      success: true,
      message: "list created",
      listId: savedList._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const findList = async (req, res, next, listId) => {
  try {
    const list = await List.findById(listId);
    if (!list) {
      throw Error("Unable to fetch the list");
    }
    req.list = list;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Unable to retrive the list" });
  }
};

const getListById = async (req, res) => {
  const { list } = req;
  res.status(200).json({ success: true, list: list, message: "list found" });
};

const updateList = async (req, res) => {
  let { list } = req;
  const listUpdate = req.body;
  if (listUpdate._id || listUpdate.boardId) {
    return res.status(400).json({
      success: false,
      message: "Forbidden request, list id or board ref cannot be updated.",
    });
  }
  list = extend(list, listUpdate);
  list = await list.save();
  res.json({ success: true, list: list });
};

const deleteList = async (req, res) => {
  const { list } = req;
  const { boardId } = list;
  await Board.updateOne({ _id: boardId }, { $pull: { lists: list._id } });
  await Card.deleteMany({ listId: list._id }).catch((err) => console.log(err));
  list
    .delete()
    .then(() => {
      return res.json({ success: true, message: "List deleted" });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

module.exports = {
  createList,
  deleteList,
  findList,
  updateList,
  getListById,
};
