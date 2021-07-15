const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "username is required to add user",
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    personal_boards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Board",
      },
    ],
    projects: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "project" },
        role: String,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
