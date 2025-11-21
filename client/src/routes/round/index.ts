import type { RouteObject } from "react-router";

import { auth } from "../../middlewares/auth";

import Round from "./Round";

export default <RouteObject>{
  path: "/round/:roundId",
  Component: Round,
  middleware: [auth],
};
