import { IDiary } from "../models/Diary/types";

const sortDiaries = (prevDiary, nextDiary) => {
  if (
    Number(prevDiary?.duration || 0) > Number(nextDiary?.duration || 0) ||
    Number(prevDiary?.importance) > Number(nextDiary?.importance) ||
    !!!prevDiary?.importance
  ) {
    return 1;
  }

  if (
    Number(prevDiary?.duration || 0) < Number(nextDiary?.duration || 0) ||
    Number(prevDiary?.importance) < Number(nextDiary?.duration)
  ) {
    return -1;
  }

  return 0;
};

export const getSortedDiaries = (diaries: IDiary[]): IDiary[] => {
  return diaries.sort(sortDiaries);
};
