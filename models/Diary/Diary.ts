import { model, Schema } from "mongoose";
import { IDiary } from "./types";

const schema = new Schema<IDiary>({
  title: { type: String },
  finished: { type: Boolean },
  archived: { type: Boolean },
  deleted: { type: Boolean },
  duration: { type: Number },
  importance: { type: Number },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

export default model("Diary", schema);
