import "reflect-metadata";
import http from "http";
import express from "express";
import {
  createConnection,
  getConnectionOptions,
} from "typeorm";

import {
  applyMiddlewares,
  applyRoutes,
} from "./utils";
import middlewares from "./middlewares";
import routes from "./routes";
import errorHandlers from "./middlewares/error-handlers";
import {scrapeTheTournamentList} from "./jobs/scrape-tournament-list";
import {Tournament} from "./entity/tournament";
import {Match} from "./entity/match";
import {Team} from "./entity/team";

process.on("uncaughtException", (e) => {
  console.log(e);
  process.exit(1);
});
process.on("unhandledRejection", (e) => {
  console.log(e);
  process.exit(1);
});
/*
createConnection()
  .then(async () => {
    const router = express();
    applyMiddlewares(middlewares, router);
    applyRoutes(routes, router);
    applyMiddlewares(errorHandlers, router);

    const {PORT = 8000} = process.env;
    const server = http.createServer(router);

    server.listen(PORT, () => {
      return console.log(
        `Server is running http://localhost:${PORT}`,
      );
    });
  })
  .catch((error) => {
    return console.log(error);
  });
 */

createConnection()
  .then(async () => {
    await scrapeTheTournamentList();

    const tournaments = await Tournament.find();
    console.log(tournaments, tournaments.length);
    /* tournaments.forEach((t) => {
        console.log(t);
        t.remove();
      }); */
  })
  .catch((error) => {
    return console.log(error);
  });
