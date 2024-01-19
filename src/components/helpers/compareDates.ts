import formatDate from "./formatDate";

export function hasCommonDates(array1: Date[], array2: Date[]): boolean {
  return array1.some((date1) =>
    array2.some((date2) => formatDate(date1, "RU") === formatDate(date2, "RU"))
  );
}

export function hasCommonDate(array: Date[], targetDate: Date): boolean {
  return array.some(
    (date) => formatDate(date, "RU") === formatDate(targetDate, "RU")
  );
}

export function getCommonDates(array1: Date[], array2: Date[]): Date[] {
  return array1.filter((date1) =>
    array2.some((date2) => formatDate(date1, "RU") === formatDate(date2, "RU"))
  );
}
export function getCommonDate(array: Date[], targetDate: Date): Date[] {
  return array.filter(
    (date) => formatDate(date, "RU") === formatDate(targetDate, "RU")
  );
}

export function dateDiffInDays(date1: Date, date2: Date) {
  const timestamp1 = date1.getTime();
  const timestamp2 = date2.getTime();

  const differenceInMilliseconds = Math.abs(timestamp2 - timestamp1);
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return differenceInDays;
}

export function areDatesEqual(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
