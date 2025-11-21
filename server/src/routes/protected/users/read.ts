import { type RouteOptions } from "fastify";

import User from "../../../models/User";
import {
  UsersReadParamsSchema,
  UsersRead2xxResponseSchema,
} from "../../schemas";
import { UsersReadParams } from "../../types";

export default <RouteOptions>{
  method: "GET",
  url: "/users/:id?",
  config: {
    adminOnly: true,
  },
  schema: {
    params: UsersReadParamsSchema,
    response: { "2xx": UsersRead2xxResponseSchema },
  },
  handler: async (req, res) => {
    const { id } = <UsersReadParams>req.params;
    return (id ? User.findByPk(id) : User.findAll()).then(
      (result) => result || res.code(404).send("Not Found")
    );
  },
};
