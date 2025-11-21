import { type RouteOptions } from "fastify";
import User from "../../../models/User";
import { type UsersCreateBody } from "../../types";
import {
  UsersCreate2xxResponseSchema,
  UsersCreateBodySchema,
} from "../../schemas";

export default <RouteOptions>{
  method: "POST",
  url: "/users",
  config: {
    adminOnly: true,
  },
  schema: {
    body: UsersCreateBodySchema,
    response: {
      "2xx": UsersCreate2xxResponseSchema,
    },
  },
  handler: async (req, res) =>
    User.create(<UsersCreateBody>req.body)
      .then((newUser) => res.send(newUser))
      .catch((e) => {
        return e.name === "SequelizeUniqueConstraintError"
          ? res.code(422).send("Conflict")
          : res.code(500).send(e);
      }),
};
