const { Schema, model } = require("mongoose");

const schema = new Schema({
  theme: { type: String, required: true },
  efficiency: { type: Number, required: true },
});

module.exports = model("Settings", schema);
