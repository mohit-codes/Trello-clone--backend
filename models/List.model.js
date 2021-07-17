const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: "cannot add unnamed list",
      unique: true,
    },
    boardId: { type: Schema.Types.ObjectId, ref: "Board" },
    cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
  },
  { timestamps: true }
);

listSchema.statics.findOneOrCreateWith = async function findOneOrCreateWith(
  condition,
  doc
) {
  const one = await this.findOne(condition);
  return one || this.create(doc);
};
//Export the model
const List = mongoose.model("List", listSchema);
module.exports = List;
