export const calculateSemesterDate = (fromToday) => {
  let now = new Date();
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let springSemesterBegin = new Date(now.getFullYear(), 0, 29);
  let springSemesterEnd = new Date(now.getFullYear(), 6, 1);
  let autumnSemesterBegin = new Date(now.getFullYear(), 7, 22);
  let autumnSemesterEnd = new Date(now.getFullYear() + 1, 0, 30);
  if (now > springSemesterBegin && now < springSemesterEnd) {
    if (fromToday) {
      return [today, springSemesterEnd];
    }
    return [springSemesterBegin, springSemesterEnd];
  }
  if (
    now > new Date(now.getFullYear(), 0, 1) &&
    now < new Date(now.getFullYear(), 0, 30)
  ) {
    if (fromToday) {
      return [today, new Date(now.getFullYear(), 0, 30)];
    }
    return [
      new Date(now.getFullYear() - 1, 7, 21),
      new Date(now.getFullYear(), 0, 30),
    ];
  }
  if (fromToday) return [today, autumnSemesterEnd];
  return [autumnSemesterBegin, autumnSemesterEnd];
};
