const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  finished: { type: Boolean, required: true },
  duration: { type: Number },
  importance: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Diary", schema);
