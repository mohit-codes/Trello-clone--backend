const Board = require("../models/board.model");

const createBoard = async (req, res) => {
  const { name, userId } = req.body;
  const board = new Board({ name: name, user_id: userId });
  const savedBoard = await board.save();
};

const findBoard = async (req, res, next, userId) => {
  //   const board = await Board.find;
};

const updateBoard = (params) => {};
const deleteBoard = (params) => {};

module.exports = { createBoard, deleteBoard, findBoard, updateBoard };
