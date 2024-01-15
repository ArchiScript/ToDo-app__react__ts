export default function formatDate(
  date: Date | Date[],
  lang: string,
  dateOpts?: Intl.DateTimeFormatOptions
): string {
  dateOpts = dateOpts || { day: "numeric", month: "numeric", year: "numeric" };
  let f = new Intl.DateTimeFormat(lang, dateOpts);

  return !Array.isArray(date)
    ? f.format(date)
    : date.map((d) => f.format(d)).join(" - ");
}
