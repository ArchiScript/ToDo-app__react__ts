export default function formatDate(
  date: Date,
  lang: string,
  dateOpts?: Intl.DateTimeFormatOptions
) {
  dateOpts = dateOpts || { day: "numeric", month: "numeric", year: "numeric" };
  let f = new Intl.DateTimeFormat(lang, dateOpts);
  return f.format(date);
}
