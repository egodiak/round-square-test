import type { Session } from "../types";

export default function parseAuthToken(authToken: string): Session {
  const [userId, role, , name] = authToken.split(":").map(decodeURIComponent);
  return { userId, role, name };
}
