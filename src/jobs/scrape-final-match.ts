/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import axios from "axios";
import {JSDOM} from "jsdom";
import {
  createConnection,
  Repository,
} from "typeorm";
import {Match} from "../entity/match";
import {Tournament} from "../entity/tournament";
import {parseRawMatchDate} from "../utils/date-utils";

async function scrapeFinalMatch(
  tournament: Tournament,
) {
  // TODO: change torunament link to tournament.link
  const TOURNAMENT_LINK = tournament.link;
  /* "https://liquipedia.net/dota2/SEA_Dota_Invitational/2020/Vietnam_Qualifier"; */
  /* "https://liquipedia.net/dota2/EGB/Isolation_Cup"; */
  /* "https://liquipedia.net/dota2/Dota_Pit_League/Season_8/Online/China"; */
  /* "https://liquipedia.net/dota2/ESL/UK_Premiership/2020/Spring"; */
  /* "https://liquipedia.net/dota2/Home_Camp"; */
  /* "https://liquipedia.net/dota2/Dota_2_BEAT_Invitational/Season_9"; */
  const {data} = await axios.get(TOURNAMENT_LINK);

  const {
    window: {document},
  } = new JSDOM(data, {
    url: TOURNAMENT_LINK,
    /* runScripts: "dangerously", */
  });

  let match = null as null | Match;

  const bracketsWrappers = document.getElementsByClassName(
    "bracket-scroller",
  );
  if (!bracketsWrappers.length) {
    return match;
  }
  const bracketsWrapper =
    bracketsWrappers[bracketsWrappers.length - 1];

  const brackets = bracketsWrapper.getElementsByClassName(
    "bracket-column-matches",
  );

  for (
    let index = brackets.length - 1;
    index >= 0;
    index -= 1
  ) {
    const bracketElement = brackets[index];

    const bracketTitle = bracketElement
      .getElementsByClassName("bracket-header")[0]
      ?.innerHTML.trim();

    if (
      bracketTitle
      && (bracketTitle.includes("Grand Final")
        || bracketTitle.includes("Final Round"))
    ) {
      const popUp = bracketElement.getElementsByClassName(
        "bracket-popup",
      )[0];

      if (!popUp) {
        return match;
      }

      const rawDateElement = popUp.getElementsByClassName(
        "timer-object",
      )[0] as HTMLSpanElement | undefined;
      const matchDate = rawDateElement?.innerHTML
        ? parseRawMatchDate(rawDateElement)
        : null;

      const leftTeamTitle =
        popUp
          .getElementsByClassName(
            "bracket-popup-header-left",
          )[0]
          ?.getElementsByClassName(
            "team-template-text",
          )[0]
          ?.getElementsByTagName("a")[0]
          ?.innerHTML ?? "TBD";
      const rightTeamTitle =
        popUp
          .getElementsByClassName(
            "bracket-popup-header-right",
          )[0]
          ?.getElementsByClassName(
            "team-template-text",
          )[0]
          ?.getElementsByTagName("a")[0]
          ?.innerHTML ?? "TBD";

      const bestOf = popUp.getElementsByClassName(
        "bracket-popup-body-match",
      ).length;

      match = new Match();
      match.construct({
        teams: [
          leftTeamTitle,
          rightTeamTitle
        ],
        date: matchDate,
        bestOf,
        tournament,
        tournamentId: tournament.id,
      });
      break;
    }
  }
  return match;
}
async function saveOrUpdateMatch(
  matchRepository: Repository<Match>,
  match: Match,
) {
  const oldMatch = await matchRepository.findOne({
    where: {
      tournamentId: match.tournamentId,
    },
  });

  if (!oldMatch) {
    await match.save();
  } else {
    await matchRepository.merge(oldMatch, match);
    await matchRepository.save(oldMatch);
  }
}

async function printAllMatches() {
  const matches = await Match.find();
  matches.forEach((match) => {
    console.log(match.print());
  });

  console.log(matches.length);
}

createConnection()
  .then(async (connection) => {
    const matchRepo = connection.getRepository(
      Match,
    );

    const tournaments = await Tournament.find();

    for (const tournament of tournaments) {
      const match = await scrapeFinalMatch(
        tournament,
      );
      if (match) {
        await saveOrUpdateMatch(matchRepo, match);
      }
    }

    await printAllMatches();
  })
  .catch((error) => {
    return console.log(error);
  });
