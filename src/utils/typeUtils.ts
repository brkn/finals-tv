import {
  Router,
  Request,
  Response,
  NextFunction,
} from "express";

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;

export type Route = {
  path: string;
  method:
    | "get"
    | "post"
    | "put"
    | "patch"
    | "delete";
  handler: Handler | Handler[];
  middlewares?: MiddlewareWithPath[];
};

export type Middleware = (router: Router) => void;
export type MiddlewareWithPath = (
  router: Router,
  path: Route["path"],
) => void;

export interface JwtPayload {
  userId: string;
  username: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
