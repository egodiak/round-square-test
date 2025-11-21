import { type FastifyRequest } from "fastify";
import { Session } from "../types";

export default function (req: FastifyRequest): Session {
  const authHeader = req.headers["authorization"];

  if (!authHeader) throw new Error("Unauthorized");

  const [userId, role, sign] = authHeader.split(":");

  return {
    userId: decodeURIComponent(userId),
    role: decodeURIComponent(role),
    sign: decodeURIComponent(sign),
  };
}
