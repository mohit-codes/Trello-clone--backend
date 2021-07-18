const mongoose = require("mongoose");
const { Schema } = mongoose;

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "cannot add unnamed board",
      unique: true,
    },
    description: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lists: [{ type: Schema.Types.ObjectId, ref: "List" }],
  },
  { timestamps: true }
);
boardSchema.statics.findOneOrCreateWith = async function findOneOrCreateWith(
  condition,
  doc
) {
  const one = await this.findOne(condition);
  return one || this.create(doc);
};
//Export the model
const Board = mongoose.model("boards", boardSchema);
module.exports = Board;
