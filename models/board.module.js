const mongoose = require("mongoose");
const { Schema } = mongoose;

const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: "cannot add unnamed board",
      unique: true,
    },
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: "List",
      },
    ],
  },
  { timestamps: true }
);

//Export the model
const Board = mongoose.model("Board", boardSchema);
module.exports = { Board };
