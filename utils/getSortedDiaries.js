const sortDiariesDuration = (prevDiary, nextDiary) => {
  if (Number(prevDiary?.duration || 0) > Number(nextDiary?.duration || 0)) {
    return 1;
  }

  if (Number(prevDiary?.duration || 0) < Number(nextDiary?.duration || 0)) {
    return -1;
  }

  return 0;
};

const getSortedDiaries = (diaries) => {
  const importantDiaries = diaries
    .filter((diary) => diary.importance === "important")
    .sort(sortDiariesDuration);

  const notImportantDiaries = diaries
    .filter((diary) => diary.importance === "not_important")
    .sort(sortDiariesDuration);

  const otherDiaries = diaries
    .filter(
      (diary) =>
        diary.importance === undefined ||
        diary.importance === null ||
        !diary.importance
    )
    .sort(sortDiariesDuration);

  return [...importantDiaries, ...notImportantDiaries, ...otherDiaries];
};

module.exports = getSortedDiaries;
