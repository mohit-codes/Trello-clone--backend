const express = require("express");
const { login } = require("../controllers/user.controller");
const { router } = express;

router.route("/login").post(login);

router.export;
