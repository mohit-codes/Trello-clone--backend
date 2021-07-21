const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: "cannot add unnamed team",
      unique: true,
    },
    description: { type: String },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Board",
      },
    ],
    teamMembers: [
      {
        memberId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        username: String,
      },
    ],
    projectCode: Number,
  },
  { timestamps: true }
);

projectSchema.statics.findOneOrCreateWith = async function findOneOrCreateWith(
  condition,
  doc
) {
  const one = await this.findOne(condition);
  return one || this.create(doc);
};

//Export the model
const Project = mongoose.model("projects", projectSchema);
module.exports = Project;
