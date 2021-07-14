const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    author: { type: String, required: "Author is required" },
    date: Date.now,
  },
  { timestamps: true }
);

//Export the model
const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
