import {
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import * as jwt from "jsonwebtoken";

import {JwtPayload} from "../utils/typeUtils";
import {createJwt} from "../utils/auth-utils";

export const checkJwt = (router: Router, path: string) => {
  router.use(path, (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const {SECRET} = process.env;
    if (!SECRET) {
      throw new Error("'Secret' is missing at environment");
    }

    // Get the jwt token from the head
    const token = req.headers.auth as string;
    let decodedJwt: JwtPayload;

    // Try to validate the token and get data
    try {
      decodedJwt = jwt.verify(
        token,
        SECRET,
      ) as JwtPayload;

      res.locals.jwtPayload = decodedJwt;
    } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
      res.status(401).send();
      return;
    }

    // The token is valid for 1 hour
    // We want to send a new token on every request
    const {userId, username} = decodedJwt;

    const newToken = createJwt({id: userId, username}, "1h");
    res.setHeader("token", newToken);

    // Call the next middleware or controller
    next();
  });
};
