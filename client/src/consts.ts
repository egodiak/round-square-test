import { RoundStatus } from "./types";

export const ROUND_STATUS_RU: Record<RoundStatus, string> = {
  [RoundStatus.COOLDOWN]: "в ожидании",
  [RoundStatus.ACTIVE]: "активен",
  [RoundStatus.FINISHED]: "завершён",
};
