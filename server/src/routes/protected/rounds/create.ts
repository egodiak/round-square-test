import { type RouteOptions } from "fastify";

import Round from "../../../models/Round";
import {
  RoundsCreate2xxResponseSchema,
  RoundsCreateBodySchema,
} from "../../schemas";

export default <RouteOptions>{
  method: "POST",
  url: "/rounds",
  config: {
    adminOnly: true,
  },
  schema: {
    body: RoundsCreateBodySchema,
    response: { "2xx": RoundsCreate2xxResponseSchema },
  },
  handler: async () => Round.create(),
};
