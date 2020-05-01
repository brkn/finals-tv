import {
  Router,
} from "express";

import {
  Middleware,
  Route,
  MiddlewareWithPath,
} from "./typeUtils";

export const applyMiddlewares = (
  middlewares: Middleware[],
  router: Router,
) => {
  middlewares.forEach((middleware) => {
    middleware(router);
  });
};

export const applyMiddlewaresToRoute = (
  middlewares: MiddlewareWithPath[],
  path: string,
  router: Router,
) => {
  middlewares.forEach((middleware) => {
    middleware(router, path);
  });
};

export const applyRoutes = (
  routes: Route[],
  router: Router,
) => {
  routes.forEach((route: Route) => {
    const {
      method,
      path,
      handler,
      middlewares,
    } = route;

    router[method](path, handler);

    if (middlewares?.length) {
      applyMiddlewaresToRoute(
        middlewares,
        path,
        router,
      );
    }
  });
};
