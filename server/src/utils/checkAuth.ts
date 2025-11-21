import { type FastifyReply, type FastifyRequest } from "fastify";
import { parse as parseCookies } from "cookie";

import makeSign from "./makeSign";
import { ADMIN_ROLE } from "../config";
import getSession from "./getSession";

export default async function (
  req: FastifyRequest,
  rep: FastifyReply,
  doCheckAdmin?: boolean
) {
  if (!req.headers["authorization"]) return rep.code(401).send("Unauthorized");

  const { userId, role, sign } = getSession(req) || {};

  if (!(userId && role && sign && makeSign(userId) === sign))
    return rep.code(401).send("Unauthorized");

  if (doCheckAdmin && role !== ADMIN_ROLE)
    return rep.code(403).send("Forbidden");
}
