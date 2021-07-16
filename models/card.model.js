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
    list_id: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    // members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
cardSchema.statics.findOneOrCreateWith = async function findOneOrCreateWith(
  condition,
  doc
) {
  const one = await this.findOne(condition);
  return one || this.create(doc);
};
//Export the model
const Card = mongoose.model("Card", cardSchema);
module.exports = { Card };
