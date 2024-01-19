export function dateReviver(
  date: string | Date | [string | Date, string | Date]
): Date | Date[] {
  if (Array.isArray(date)) {
    return date.map((d) => new Date(d));
  } else {
    return new Date(date);
  }
}