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
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    personalBoards: [{ type: Schema.Types.ObjectId, ref: "Board" }],
  },
  { timestamps: true }
);

userSchema.statics.findOneOrCreateWith = async function findOneOrCreateWith(
  condition,
  doc
) {
  const one = await this.findOne(condition);
  return one || this.create(doc);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
