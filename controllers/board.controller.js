const Board = require("../models/board.model");
const User = require("../models/user.model");
const Project = require("../models/project.model");
const { extend } = require("lodash");
const List = require("../models/list.model");

const createBoard = async (req, res) => {
  try {
    const { title, userId, isPersonal,projectId } = req.body;
    const board = new Board({
      title: title,
      userId: userId,
      projectId: projectId,
    });
    const savedBoard = await board.save();

    if (isPersonal) {
      const user = await User.findById(userId);
      user.personalBoards.push(savedBoard);
      await user.save();
    } else {
      await Project.updateOne(
        { _id: projectId },
        { $push: { boards: savedBoard._id } }
      );
    }

    res.status(201).json({
      success: true,
      message: "Board created",
      board: savedBoard,
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
      .json({ success: false, message: "Unable to retrieve the board" });
  }
};

const getBoardById = async (req, res) => {
  const { board } = req;
  res.status(200).json({ success: true, board: board, message: "board found" });
};

const updateBoard = async (req, res) => {
  let { board } = req;
  const boardUpdate = req.body;
  if (boardUpdate._id || boardUpdate.userId) {
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
  const { userId } = board;
  await User.updateOne(
    { _id: userId },
    { $pull: { personalBoards: board._id } }
  );
  await List.deleteMany({ boardId: board._id }).catch((err) =>
    console.log(err)
  );
  board
    .delete()
    .then(() => {
      return res.json({ success: true, message: "Board deleted" });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

const fetchListsByBoardId = async (req, res) => {
  const boardId = req.params.boardId;
  const { lists } = await Board.findById(boardId);
  const data = await List.find({ _id: { $in: lists } }).catch((err) =>
    console.log(err)
  );
  return res.status(200).json({ success: true, lists: data });
};

const fetchBoardsByUserId = async (req, res) => {
  const userId = req.params.userId;
  const { personalBoards } = await User.findById(userId);
  try {
    const data = await Board.find({ _id: { $in: personalBoards } }).catch(
      (err) => console.log(err)
    );
    return res.status(200).json({ success: true, boards: data });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, boards: null });
  }
};

module.exports = {
  createBoard,
  deleteBoard,
  findBoard,
  updateBoard,
  getBoardById,
  fetchListsByBoardId,
  fetchBoardsByUserId,
};
