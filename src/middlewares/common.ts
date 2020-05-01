import {Router} from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";

export const handleCors = (router: Router) => {
  return router.use(
    cors({credentials: true, origin: true}),
  );
};

export const handleBodyRequestParsing = (
  router: Router,
) => {
  router.use(parser.urlencoded({extended: true}));
  router.use(parser.json());
};

export const handleCompression = (
  router: Router,
) => {
  router.use(compression());
};

export const handleMorgan = (
  router: Router,
) => {
  router.use(morgan("tiny"));
};

export const handleHelmet = (
  router: Router,
) => {
  router.use(helmet());
};
