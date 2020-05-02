import axios from "axios";
import {JSDOM} from "jsdom";
import {Tournament} from "../entity/tournament";

async function scrapeTheTournamentPage() {
  const {data} = await axios.get(
    "https://liquipedia.net/dota2/Epic_League/Prime/1",
  );

  const {
    window: {document},
  } = new JSDOM(data);

  const tournaments = ["fixme: scrape the list"];

  for (
    let index = 0;
    index < tournaments.length;
    index += 1
  ) {
    const tournamentName =
      "fixme: scrape tournament name"; // maybe i dont need this. Since i will come here from tournaments list.

    const tournamentsElement = tournaments[index];

    /* const tournamentName = tournamentsElement
      .getElementsByClassName("tournaments-header")[0]
      .innerHTML.trim(); */

    const tournament = new Tournament({
      name: tournamentName,
      tier: "major", // FIXME.
      startDate: new Date(),
      endDate: new Date(),
    });
  }
}

scrapeTheTournamentPage();
