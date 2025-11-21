import Fastify, { type RouteOptions } from "fastify";

import "./config";
import "./db";
import "./models";
import publicRoutes from "./routes/public";
import protectedRoutes from "./routes/protected";
import checkAuth from "./utils/checkAuth";
import "./types";

(async function main() {
  const app = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    },
  });

  app.addContentTypeParser(
    "text/json",
    { parseAs: "string" },
    app.getDefaultJsonParser("ignore", "ignore")
  );

  const addRoute = (spec: RouteOptions) => {
    app.route(spec);
    app.log.info(`\t${spec.method.toString().toUpperCase()}:${spec.url}`);
  };

  app.log.info("Configuring public routes:");
  publicRoutes.forEach(addRoute);

  app.log.info("Configuring protected routes:");
  protectedRoutes.forEach((spec: RouteOptions) => {
    Object.assign(spec, {
      config: Object.assign(spec.config || {}, { checkAuth: true }),
    });
    addRoute(spec);
  });

  app.addHook("onRequest", async function (req, rep) {
    const { checkAuth: isProtected, adminOnly } = req.routeOptions.config || {};
    if (isProtected) await checkAuth(req, rep, adminOnly);
  });

  app.listen({ port: 3000 }, function (err, address) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
})();
