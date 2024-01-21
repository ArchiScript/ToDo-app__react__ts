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

interface ToStrDateOptions {
  date: Date;
  optsArr?: Intl.DateTimeFormatOptions[];
  delim?: string;
  lang: string;
}

function toStrDate({ date, optsArr, delim, lang }: ToStrDateOptions): string {
  optsArr = !optsArr
    ? [{ day: "numeric" }, { month: "numeric" }, { year: "numeric" }]
    : optsArr;

  delim = delim || ".";
  let dateOpts: Intl.DateTimeFormatOptions = Object.assign({}, ...optsArr);

  function formatDate(dateOpts: Intl.DateTimeFormatOptions): string {
    let f = new Intl.DateTimeFormat(lang, dateOpts);
    return f.format(date);
  }

  if (optsArr[1]?.month === "long") {
    return formatDate(dateOpts);
  } else {
    return optsArr.map(formatDate).join(delim);
  }
}
