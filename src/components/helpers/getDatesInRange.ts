import { dateDiffInDays } from "./compareDates";

export function getDatesInRange(dates: Date[]): Date[] {
  if (dates.length === 1) {
    return dates;
  }
  const dateDiff = dateDiffInDays(dates[1], dates[0]);
  const startDate = dates[0];

  const datesArr = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i <= dateDiff; i++) {
    datesArr.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return datesArr;
}
