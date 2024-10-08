import { Schema, model } from "mongoose";
import { IUser } from "./types";

const schema = new Schema<IUser>({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String },
  diaries: [{ type: Schema.Types.ObjectId, ref: "Diary" }],
  settings: {
    userSettings: {
      efficiency: { type: Number },
      isUsingEfficiency: { type: Boolean },
    },
    serverSettings: {
      isDailyArchivating: { type: Boolean },
      archivatingTime: { type: Number },
      isDailyClearArchive: { type: Boolean },
      isShowWelcome: { type: Boolean },
      isShowLearn: { type: Boolean },
    },
  },
});

export default model("User", schema);
