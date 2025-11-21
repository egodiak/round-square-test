export type Session = {
  userId: string;
  role: string;
  name: string;
};

export type SessionContext = {
  session: Session;
  setSession: (value: Session) => void;
};

export enum RoundStatus {
  COOLDOWN = "COOLDOWN",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

export type Round = {
  id: string;
  startDate: Date | string;
  endDate: Date | string;
  status: RoundStatus;
  winner?: {
    userId: string;
    name: string;
    score: number;
  };
  ownScore?: number;
  totalScore?: number;
};
