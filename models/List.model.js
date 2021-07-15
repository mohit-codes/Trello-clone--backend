const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: "cannot add unnamed list",
      unique: true,
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  { timestamps: true }
);

//Export the model
const List = mongoose.model("List", listSchema);
module.exports = { List };
