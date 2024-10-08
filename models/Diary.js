const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String },
  finished: { type: Boolean },
  archived: { type: Boolean },
  deleted: { type: Boolean },
  duration: { type: Number },
  importance: { type: Number },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Diary", schema);
