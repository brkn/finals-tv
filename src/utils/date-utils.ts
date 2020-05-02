import parse from "date-fns/parse";

export function parseRawDates(
  dateString: string,
): Date[] {
  // TODO: This function needs refactor. It cant parse strings span 2 years.
  // EX: it can parse these:
  // datestring: Nov 23 - 29, 2020
  // datestring: Nov 23 - Dec 29, 2020
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
    startDateString,
    "LLL d",
    new Date(year.trim()),
  );

  const endDateFormat = new RegExp(
    ".*[a-zA-Z]+.*",
  ).test(endDateString)
    ? "LLL d"
    : "d";

  const endDate = parse(
    endDateString,
    endDateFormat,
    startDate,
  );

  return [
    startDate,
    endDate
  ];
}
