import { createHmac } from "crypto";

import { SIGN_ALGORITHM, SIGN_SECRET } from "../config";

export default (data: string | Buffer) =>
  createHmac(SIGN_ALGORITHM, SIGN_SECRET).update(data).digest("base64");
