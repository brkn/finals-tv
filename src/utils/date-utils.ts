import parse from "date-fns/parse";

export function parseRawDates(
  dateString: string,
): Date[] {
  // TODO: This function needs refactor. It cant parse strings span 2 years.
  // EX: it can parse these:
  // datestring: Nov 23 - 29, 2020
  // datestring: Nov 23 - Dec 29, 2020
  // datestring: Nov 23, 2020 // tournmanet starts and ends in the same day
  // EX: it CANNOT parse this:
  // datestring: Dec 23 2020 - Jan 1, 2021

  const [
    rest,
    year
  ] = dateString.split(",");

  const [
    startDateString,
    endDateString,
  ] = rest.split("-");

  const startDate = parse(
    startDateString.trim(),
    "LLL d",
    new Date(year.trim()),
  );

  let endDate: Date;
  if (endDateString) {
    const endDateFormat = new RegExp(
      ".*[a-zA-Z]+.*",
    ).test(endDateString)
      ? "LLL d"
      : "d";

    endDate = parse(
      endDateString.trim(),
      endDateFormat,
      startDate,
    );
  } else {
    endDate = startDate;
  }

  return [
    startDate,
    endDate
  ];
}

export function parseRawMatchDate(
  rawMatchDateElement: HTMLSpanElement,
) {
  /* eslint-disable max-len */
  // Ex inputs:
  // - "May 10, 2020 - 17:00 <abbr data-tz="+8:00" title="China Standard Time (UTC+8)">CST</abbr>"
  // - "May 11, 2020 - 14:00 <abbr data-tz="+8:00" title="China Standard Time (UTC+8)">CST</abbr>"
  // - "May 16, 2020 - 12:00 <abbr data-tz="+1:00" title="British Summer Time (UTC+1)">BST</abbr>"
  // - "May 4, 2020 - 19:00 <abbr data-tz="+2:00" title="Central European Summer Time (UTC+2)">CEST</abbr>"
  // - "April 30, 2020 - 18:00 <abbr data-tz="-4:00" title="Eastern Daylight Time (UTC-4)">EDT</abbr>"
  const rawDateString = rawMatchDateElement.firstChild?.textContent?.trim();
  const timeZone = rawMatchDateElement
    .getElementsByTagName("abbr")[0]
    .getAttribute("data-tz");

  if (!rawDateString || !timeZone) {
    throw new Error(
      "rawMatchDateElement is too unusal to parse, timezone or the date string might be missing",
    );
  }
  const tz = timeZone
    .replace("-", "-0")
    .replace("+", "+0");
  const date = parse(
    `${rawDateString} ${tz}`,
    "LLLL d, uuuu - HH:mm xxx",
    new Date(),
  );

  return date;
}
