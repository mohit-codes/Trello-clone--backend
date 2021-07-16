const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    author: { type: String, required: "Author is required" },
    date: Date.now,
    card_id: { type: Schema.Types.ObjectId, ref: "Card" },
  },
  { timestamps: true }
);

commentSchema.statics.findOneOrCreateWith = async function findOneOrCreateWith(
  condition,
  doc
) {
  const one = await this.findOne(condition);
  return one || this.create(doc);
};

//Export the model
const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
