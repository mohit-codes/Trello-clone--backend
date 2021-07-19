const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const { initializeDBConnection } = require("./config/db.connect");
const userRouter = require("./routers/user.router");
const boardRouter = require("./routers/board.router");
const listRouter = require("./routers/list.router");
const cardRouter = require("./routers/card.router");
const commentRouter = require("./routers/comment.router");

const PORT = 8080;

const app = express();
app.use(bodyParser.json());
// app.use(cors);

// called before any route
initializeDBConnection();

app.get("/", (req, res) => {
  return res.send({
    status: "Welcome",
  });
});

app.use("/users", userRouter);
app.use("/boards", boardRouter);
app.use("/lists", listRouter);
app.use("/cards", cardRouter);
app.use("/comments", commentRouter);

// ---------------
// Error Handlers

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "error occured, see the errMessage key for more details",
    errorMessage: err.message,
  });
});

//  404 Route Handler
//  Note: Do NOT move. This should be the last route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found on server, please check",
  });
});

app.listen(PORT, () => {
  console.log("server started on port: ", PORT);
});
