import { Schema } from "mongoose";

export type ImportanceTypes = 1 | 2 | undefined;

export interface IDiary {
  title?: string;
  finished?: boolean;
  archived?: boolean;
  deleted?: boolean;
  duration?: number;
  importance?: ImportanceTypes;
  owner?: Schema.Types.ObjectId;
}
