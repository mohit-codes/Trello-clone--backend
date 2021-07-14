const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: "cannot add unnamed card",
      unique: true,
    },
    description: String,
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
    comments: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Comment" },
      },
    ],
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

//Export the model
const Card = mongoose.model("Card", cardSchema);
module.exports = { Card };
