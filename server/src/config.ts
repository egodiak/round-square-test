import * as dotenv from "dotenv";
import * as env from "env-var";

dotenv.config({ path: process.env.ENV_FILE || "./.env" });

export const POSTGRES_URI = env.get("POSTGRES_URI").required().asUrlString();

export const SIGN_ALGORITHM = env
  .get("SIGN_ALGORITHM")
  .default("sha256")
  .asString();

export const SIGN_SECRET = env.get("SIGN_SECRET").required().asString();

export const GENERIC_ROLE = env
  .get("GENERIC_ROLE")
  .default("survival")
  .asString();
export const SPECIAL_ROLE = env
  .get("SPECIAL_ROLE")
  .default("nikita")
  .asString();
export const ADMIN_ROLE = env.get("ADMIN_ROLE").default("admin").asString();

export const ROUND_DURATION = env
  .get("ROUND_DURATION")
  .default(60)
  .asIntPositive();

export const COOLDOWN_DURATION = env
  .get("COOLDOWN_DURATION")
  .default(30)
  .asIntPositive();

export const MAGIC_TAP_NUMBER = env
  .get("MAGIC_TAP_NUMBER")
  .default(11)
  .asIntPositive();
export const MAGIC_TAP_SCORE = env
  .get("MAGIC_TAP_SCORE")
  .default(10)
  .asIntPositive();
