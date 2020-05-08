import axios from "axios";
import {JSDOM} from "jsdom";
import {
  createConnection,
  Repository,
} from "typeorm";

import {
  Tournament,
  TournamentTier,
} from "../entity/tournament";
import {parseRawDates} from "../utils/date-utils";

async function scrapeTheTournamentList() {
  const URL =
    "https://liquipedia.net/dota2/Portal:Tournaments";

  const {data} = await axios.get(URL);

  const {
    window: {document},
  } = new JSDOM(data, {url: URL});

  const tournamentRows = document.getElementsByClassName(
    "divRow",
  );

  const tournaments = [] as Tournament[];

  for (
    let index = 0;
    index < tournamentRows.length;
    index += 1
  ) {
    const element = tournamentRows[index];

    try {
      const tournamentLinkElement = element
        .getElementsByClassName("divCell Name")[0]
        .getElementsByClassName(
          "divCell mobile-hide",
        )[0]
        .getElementsByTagName("a")[0];

      const tournamentName = tournamentLinkElement.innerHTML.trim();
      const tournamentLink =
        tournamentLinkElement.href;

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

      const location = (element.getElementsByClassName(
        "divCell EventDetails Location Header",
      )[0] as HTMLDivElement).innerHTML
        .toLowerCase()
        .includes("online")
        ? "online"
        : "offline";

      const rawPrizePool = (element.getElementsByClassName(
        "divCell EventDetails Prize Header",
      )[0] as HTMLDivElement).innerHTML
        .trim()
        .replace("$", "")
        .replace(",", "");

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
        link: tournamentLink,
      });
      tournaments.push(tournament);
    } catch (error) {
      console.error(error);
    }
  }

  return tournaments;
}

async function printAllTournaments() {
  const tournaments = await Tournament.find();
  tournaments.forEach((t) => {
    console.log(t.print());
  });

  /* console.log(tournaments.length); */
}

// TODO: make this function generic
// Ex: function saveOrUpdate<T>(repository: Repository<T>, entityArray: T[])
async function saveOrUpdateTournaments(
  TournamentRepository: Repository<Tournament>,
  tournaments: Tournament[],
) {
  tournaments.forEach(async (tournament) => {
    const oldTournament = await TournamentRepository.findOne(
      {
        where: {
          name: tournament.name,
          startDate: tournament.startDate,
          endDate: tournament.endDate,
        },
      },
    );
    if (!oldTournament) {
      await tournament.save();
    } else {
      await TournamentRepository.update(
        oldTournament.id,
        tournament,
      );
    }
  });
}

createConnection()
  .then(async (connection) => {
    const tournaments = await scrapeTheTournamentList();

    const tournamentRepo = connection.getRepository(
      Tournament,
    );
    /* await printAllTournaments(); */
    await saveOrUpdateTournaments(
      tournamentRepo,
      tournaments,
    );
  })
  .catch((error) => {
    return console.log(error);
  });
