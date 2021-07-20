const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
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
const PORT = 8080;

const app = express();
app.use(bodyParser.json());
// app.use(cors);

// called before any route
initializeDBConnection();

app.get("/", (req, res) => {
  return res.send({
    status: "Welcome to trello-clone Backend ",
  });
});

app.use("/users", userRouter);
app.use("/boards", boardRouter);
app.use("/lists", listRouter);
app.use("/cards", cardRouter);
app.use("/comments", commentRouter);
app.use("/projects", projectRouter);

app.use(routeHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server started on port: ", PORT);
});
