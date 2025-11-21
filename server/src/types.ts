export enum RoundStatus {
  COOLDOWN = "COOLDOWN",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

export type Session = {
  userId: string;
  role: string;
  sign: string;
};

declare module "fastify" {
  interface FastifyContextConfig {
    checkAuth?: true;
    adminOnly?: true;
  }
}
