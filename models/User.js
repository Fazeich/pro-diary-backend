const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diaries: [{ type: Types.ObjectId, ref: "Diary" }],
});

module.exports = model("user", schema);
