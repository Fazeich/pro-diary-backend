const { Schema, model } = require("mongoose");

const schema = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diaries: [{ type: Schema.Types.ObjectId, ref: "Diary" }],
  settings: {
    efficiency: { type: Number },
    isUsingEfficiency: { type: Boolean },
  },
});

module.exports = model("User", schema);
