import {
  Request,
  Response,
} from "express";

import {Route} from "../../utils/typeUtils";
import {checkJwt} from "../../middlewares/authentication";
import AuthControllers from "../../controllers/auth";

const loginRoute: Route = {
  path: "/auth/login",
  method: "post",
  handler: async (
    req: Request,
    res: Response,
  ) => {
    AuthControllers.login(req, res);
  },
};

const registerRoute: Route = {
  path: "/auth/register",
  method: "post",
  handler: async (
    req: Request,
    res: Response,
  ) => {
    AuthControllers.register(req, res);
  },
};

const changePasswordRoute: Route = {
  path: "/auth/change-password",
  method: "post",
  handler: async (
    req: Request,
    res: Response,
  ) => {
    AuthControllers.changePassword(req, res);
  },
  middlewares: [checkJwt]
};

export default [
  loginRoute,
  registerRoute,
  changePasswordRoute,
];
