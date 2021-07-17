const Board = require("../models/board.model");
const mongoose = require("mongoose");
const { extend } = require("lodash");
const createBoard = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const board = new Board({
      name: name,
      userId: mongoose.Types.ObjectId(userId),
    });
    const savedBoard = await board.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Board created",
        boardId: savedBoard._id,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const findBoard = async (req, res, next, boardId) => {
  try {
    const board = await Board.findById(boardId);
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

const getBoardById = async (req, res) => {
  const { board } = req;
  res.status(200).json({ success: true, board: board, message: "board found" });
};

const updateBoard = async (req, res) => {
  let { board } = req;
  const boardUpdate = req.body;
  if (updateBoard._id || updateBoard.userId) {
    return res.status(400).json({
      success: false,
      message: "Forbidden request, board id or user ref cannot be updated.",
    });
  }
  board = extend(board, boardUpdate);
  board = await board.save();
  res.json({ success: true, board: board });
};

const deleteBoard = async (req, res) => {
  const { board } = req;
  board
    .delete()
    .then(() => {
      return res.json({ success: true, message: "Board deleted" });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

module.exports = {
  createBoard,
  deleteBoard,
  findBoard,
  updateBoard,
  getBoardById,
};
