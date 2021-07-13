const mongoose = require("mongoose");
require("mongoose-type-url");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  id: Schema.Types.ObjectId,
  username: {
    type: String,
    unique: true,
    required: true,
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
  team: {
    type: Schema.type.ObjectId,
    ref: "Team",
  },
});

const User = mongoose.model("User", UserSchema);

model.exports = { User };
