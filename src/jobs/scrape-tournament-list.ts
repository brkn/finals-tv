import axios from "axios";
import {JSDOM} from "jsdom";

import {
  Tournament,
  TournamentTier,
} from "../entity/tournament";
import {parseRawDates} from "../utils/date-utils";

export async function scrapeTheTournamentList() {
  const {data} = await axios.get(
    "https://liquipedia.net/dota2/Portal:Tournaments",
  );

  const {
    window: {document},
  } = new JSDOM(data);

  const tournamentRows = document.getElementsByClassName(
    "divRow",
  );

  for (
    let index = 0;
    index < tournamentRows.length;
    index += 1
  ) {
    const element = tournamentRows[index];

    const tournamentName = element
      .getElementsByClassName("divCell Name")[0]
      .getElementsByClassName(
        "divCell mobile-hide",
      )[0]
      .getElementsByTagName("a")[0]
      .innerHTML.trim();

    const tier = (element.getElementsByClassName(
      "divCell Tier",
    )[0] as HTMLDivElement)
      .getElementsByTagName("a")[0]
      .innerHTML.trim()
      .toLowerCase() as TournamentTier;

    const rawDates = (element.getElementsByClassName(
      "divCell EventDetails Date Header",
    )[0] as HTMLDivElement).innerHTML.trim();

    const [
      startDate,
      endDate
    ] = parseRawDates(
      rawDates,
    );

    const location =
      (element.getElementsByClassName(
        "divCell EventDetails Location Header",
      )[0] as HTMLDivElement)
        .getElementsByClassName("CountryText")[0]
        .innerHTML.trim() === "online"
        ? "online"
        : "offline";

    const rawPrizePool = (element.getElementsByClassName(
      "divCell EventDetails Prize Header",
    )[0] as HTMLDivElement).innerHTML
      .trim()
      .replace("$", "").replace(",", "");

    const prizePool = Number.isNaN(
      parseInt(rawPrizePool, 10),
    )
      ? 0
      : parseInt(rawPrizePool, 10);

    const tournament = new Tournament();
    tournament.construct({
      name: tournamentName,
      startDate,
      endDate,
      prizePool,
      location,
      tier,
    });
    tournament.save();
  }
}
