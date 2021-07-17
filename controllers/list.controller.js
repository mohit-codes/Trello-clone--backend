const List = require("../models/list.model");
const mongoose = require("mongoose");
const { extend } = require("lodash");
const createList = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const board = new List({
      name: name,
      userId: mongoose.Types.ObjectId(userId),
    });
    const savedList = await board.save();
    res.status(201).json({
      success: true,
      message: "List created",
      boardId: savedList._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const findList = async (req, res, next, boardId) => {
  try {
    const board = await List.findById(boardId);
    if (!board) {
      throw Error("Unable to fetch the board");
    }
    req.board = board;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Unable to retrive the product" });
  }
};

const getListById = async (req, res) => {
  const { board } = req;
  res.status(200).json({ success: true, board: board, message: "board found" });
};

const updateList = async (req, res) => {
  let { board } = req;
  const boardUpdate = req.body;
  if (updateList._id || updateList.userId) {
    return res.status(400).json({
      success: false,
      message: "Forbidden request, board id or user ref cannot be updated.",
    });
  }
  board = extend(board, boardUpdate);
  board = await board.save();
  res.json({ success: true, board: board });
};

const deleteList = async (req, res) => {
  const { board } = req;
  board
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
