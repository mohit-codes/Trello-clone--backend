require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializeDBConnection } = require("./config/db.connect");
const userRouter = require("./routers/user.router");
const boardRouter = require("./routers/board.router");
const listRouter = require("./routers/list.router");
const cardRouter = require("./routers/card.router");
const commentRouter = require("./routers/comment.router");
const projectRouter = require("./routers/project.router");
const routeHandler = require("./middlewares/routeHandler");
const errorHandler = require("./middlewares/errorHanler");
const authenticate = require("./middlewares/authenticate");
const { corsOptions } = require("./util");

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

// called before any route
initializeDBConnection();

app.get("/", (req, res) => {
  return res.send({
    status: "Welcome to trello-clone Backend ",
  });
});

app.use("/users", userRouter);
app.use("/boards", authenticate, boardRouter);
app.use("/lists", authenticate, listRouter);
app.use("/cards", authenticate, cardRouter);
app.use("/comments", authenticate, commentRouter);
app.use("/projects", authenticate, projectRouter);

app.use(routeHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("server started on port: ", port);
});
