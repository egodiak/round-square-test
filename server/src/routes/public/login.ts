import type { RouteOptions } from "fastify";

import User from "../../models/User";
import makeSign from "../../utils/makeSign";
import { Login2xxResponseSchema, LoginBodySchema } from "../schemas";
import { type LoginBody } from "../types";
import { ADMIN_ROLE, GENERIC_ROLE, SPECIAL_ROLE } from "../../config";

export default <RouteOptions>{
  method: "POST",
  url: "/login",
  schema: {
    body: LoginBodySchema,
    response: { "2xx": Login2xxResponseSchema },
  },
  handler: async (req, res) => {
    const { username, password } = <LoginBody>req.body;

    const [user] = await User.findOrCreate({
      where: { username: username },
      defaults: {
        username,
        password,
        name: username,
        role: username.startsWith(ADMIN_ROLE)
          ? ADMIN_ROLE
          : username.startsWith(SPECIAL_ROLE)
          ? SPECIAL_ROLE
          : GENERIC_ROLE,
      },
    });

    if (user?.password !== password) return res.code(401).send("Unathorized");

    const authToken = `${encodeURIComponent(user.id)}:${encodeURIComponent(
      user.role
    )}:${makeSign(user.id)}:${encodeURIComponent(user.name)}`;

    return res.header("authorization", authToken).send(user.toJSON());
  },
};
