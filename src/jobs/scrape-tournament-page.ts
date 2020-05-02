import axios from "axios";
import {JSDOM} from "jsdom";
import {Team} from "../entity/team";
import {Match} from "../entity/match";

async function scrapeTheTournamentPage() {
  const {data} = await axios.get(
    "https://liquipedia.net/dota2/Epic_League/Prime/1",
  );

  const {
    window: {document},
  } = new JSDOM(data);

  const bracketsWrapper = document.getElementsByClassName(
    "bracket-scroller",
  )[0];

  const brackets = bracketsWrapper.getElementsByClassName(
    "bracket-column-matches",
  );

  for (
    let index = 0;
    index < brackets.length;
    index += 1
  ) {
    const bracketElement = brackets[index];

    const bracketTitle = bracketElement
      .getElementsByClassName("bracket-header")[0]
      .innerHTML.trim();

    if (bracketTitle === "Grand Finals") {
      const fixme = bracketElement.getElementsByClassName(
        "",
      );

      const leftTeamTitle = "fixme scrape";
      const rightTeamTitle = "fixme scrape";

      const leftTeam = new Team(leftTeamTitle);
      const rightTeam = new Team(rightTeamTitle);
      const bestOf = 5; // FIXME: get the number;

      const match = new Match(
        [
          leftTeam,
          rightTeam
        ],
        bestOf,
      );

      // check if match has complete data
      // if true then tournament.match = match;
    }
  }
}

scrapeTheTournamentPage();
