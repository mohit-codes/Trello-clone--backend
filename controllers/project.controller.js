const Project = require("../models/project.model");
const User = require("../models/user.model");
const { extend } = require("lodash");
const Board = require("../models/board.model");
const randomCode = () => Math.floor(Math.random() * (1000 - 1) + 1);

const createProject = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const project = new Project({
      title: title,
      description: description,
      adminId: userId,
      projectCode: randomCode(),
    });
    const user = await User.findById(userId);
    project.teamMembers.push({ memberId: userId, username: user.username });
    const savedProject = await project.save();
    user.projects.push(savedProject);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Project created",
      projectId: savedProject._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const joinProject = async (req, res) => {
  try {
    const { projectCode, userId } = req.body;
    const project = await Project.findOne({ projectCode: projectCode });
    const user = await User.findById(userId);
    if (!project || !user) {
      res
        .status(500)
        .json({ success: false, message: "Invalid projectCode or userId" });
    }
    await User.updateOne({ _id: userId }, { $push: { projects: project._id } });
    await Project.updateOne(
      { _id: project._id },
      { $push: { teamMembers: { memberId: userId, username: user.username } } }
    );
    res.status(200).json({
      success: true,
      message: "Project joined",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const findProject = async (req, res, next, projectId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      throw Error("Unable to fetch the project");
    }
    req.project = project;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Unable to retrieve the project" });
  }
};

const getProjectById = async (req, res) => {
  const { project } = req;
  res
    .status(200)
    .json({ success: true, project: project, message: "project found" });
};

const updateProject = async (req, res) => {
  let { project } = req;
  const projectUpdate = req.body;
  if (projectUpdate._id || projectUpdate.adminId) {
    return res.status(400).json({
      success: false,
      message: "Forbidden request, project id or admin ref cannot be updated.",
    });
  }
  project = extend(project, projectUpdate);
  project = await project.save();
  res.json({ success: true, project: project });
};

const deleteProject = async (req, res) => {
  const { project } = req;
  const { teamMembers } = project;
  await User.updateMany(
    { _id: { $in: teamMembers } },
    { $pull: { projects: project._id } }
  );
  await Board.deleteMany({ projectId: project._id }).catch((err) =>
    console.log(err)
  );
  project
    .delete()
    .then(() => {
      return res.json({ success: true, message: "Project deleted" });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

const fetchBoardsByProjectId = async (req, res) => {
  const projectId = req.params.projectId;
  const { boards } = await Project.findById(projectId);
  const data = await Board.find({ _id: { $in: boards } }).catch((err) =>
    console.log(err)
  );
  return res.status(200).json({ success: true, boards: data });
};

module.exports = {
  createProject,
  deleteProject,
  findProject,
  joinProject,
  updateProject,
  getProjectById,
  fetchBoardsByProjectId,
};
