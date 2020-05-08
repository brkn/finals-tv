import "reflect-metadata";
import http from "http";
import express from "express";
import {createConnection} from "typeorm";

import {
  applyMiddlewares,
  applyRoutes,
} from "./utils";
import middlewares from "./middlewares";
import routes from "./routes";
import errorHandlers from "./middlewares/error-handlers";

process.on("uncaughtException", (e) => {
  console.log(e);
  process.exit(1);
});
process.on("unhandledRejection", (e) => {
  console.log(e);
  process.exit(1);
});

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
