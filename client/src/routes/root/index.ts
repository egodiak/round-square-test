import type { RouteObject } from "react-router";

import { auth } from "../../middlewares/auth";

import Root from "./Root";

export default <RouteObject>{
  path: "/",
  Component: Root,
  middleware: [auth],
};
