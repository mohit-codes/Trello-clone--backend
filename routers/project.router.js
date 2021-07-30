const express = require("express");
const router = express.Router();
const {
  createProject,
  findProject,
  updateProject,
  deleteProject,
  joinProject,
  fetchBoardsByProjectId,
  getProjectById,
  removeTeamMember,
  fetchProjectsByUserId,
} = require("../controllers/project.controller");

router.route("/create").post(createProject);
router.route("/join").post(joinProject);
router.route("/boards/:projectId").get(fetchBoardsByProjectId);
router.param("projectId", findProject);
router.route("/removeMember/:projectId").post(removeTeamMember);
router.route("/:userId").get(fetchProjectsByUserId);
router
  .route("/:projectId")
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

module.exports = router;
