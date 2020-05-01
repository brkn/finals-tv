import {
  Request,
  Response,
} from "express";

import {Route} from "../../utils/typeUtils";


const helloWordRoute: Route = {
  path: "/",
  method: "get",
  handler: async (
    req: Request,
    res: Response,
  ) => {
    res.send("Hello world!");
  },
};

export default [helloWordRoute];
