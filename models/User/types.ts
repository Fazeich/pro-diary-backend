import { Schema } from "mongoose";

export type UserTypes = "inactive" | "default" | "premium";

export interface IUser {
  login: string;
  password: string;
  type?: UserTypes;
  id?: string;
  settings: ISettings;
  diaries: Schema.Types.ObjectId;
}

export interface ISettings {
  userSettings: IUserSettings;

  serverSettings: IServerSettings;
}

export interface IUserSettings {
  isUsingEfficiency: boolean;
  efficiency: number;
}

export interface IServerSettings {
  isDailyArchivating: boolean;
  archivatingTime: number;
  isDailyClearArchive: boolean;
  isShowWelcome: boolean;
  isShowLearn: boolean;
}
