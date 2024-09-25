const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  importance: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Diary", schema);
