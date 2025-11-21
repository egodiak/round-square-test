import { ADMIN_ROLE, GENERIC_ROLE, SPECIAL_ROLE } from "../config";
import { RoundStatus } from "../types";

export const LoginBodySchema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
  required: ["username", "password"],
} as const;

export const Login2xxResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    username: { type: "string" },
    role: { type: "string" },
    name: { type: "string" },
  },
  required: ["id", "username", "role"],
} as const;

export const RoundsCreateBodySchema = {} as const;

export const RoundsCreate2xxResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    startDate: { type: "string" },
    endDate: { type: "string" },
    status: {
      type: "string",
      enum: [RoundStatus.COOLDOWN, RoundStatus.ACTIVE, RoundStatus.FINISHED],
    },
  },
  required: ["id", "startDate", "endDate", "status"],
} as const;

export const RoundsReadParamsSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
} as const;

export const RoundsRead2xxResponseSchema = {
  oneOf: [
    {
      type: "object",
      properties: {
        id: { type: "string" },
        startDate: { type: "string" },
        endDate: { type: "string" },
        status: {
          type: "string",
          enum: [
            RoundStatus.COOLDOWN,
            RoundStatus.ACTIVE,
            RoundStatus.FINISHED,
          ],
        },
        winner: {
          type: "object",
          properties: {
            userId: { type: "string" },
            name: { type: "string" },
            score: { type: "number" },
          },
        },
        ownScore: { type: "number" },
        totalScore: { type: "number" },
      },
      required: ["id", "startDate", "endDate", "status"],
    },
    {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          status: {
            type: "string",
            enum: [
              RoundStatus.COOLDOWN,
              RoundStatus.ACTIVE,
              RoundStatus.FINISHED,
            ],
          },
        },
        required: ["id", "startDate", "endDate", "status"],
      },
    },
  ],
} as const;

export const UsersCreateBodySchema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3 },
    password: { type: "string", minLength: 6 },
    role: {
      type: "string",
      enum: [GENERIC_ROLE, SPECIAL_ROLE, ADMIN_ROLE],
    },
  },
  required: ["username", "password", "role"],
} as const;

export const UsersCreate2xxResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    username: { type: "string" },
    role: { type: "string" },
  },
  required: ["id", "username", "role"],
} as const;

export const UsersReadParamsSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
} as const;

export const UsersRead2xxResponseSchema = {
  oneOf: [
    {
      type: "object",
      properties: {
        id: { type: "string" },
        username: { type: "string" },
        role: { type: "string" },
      },
      required: ["id", "username", "role"],
    },
    {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          username: { type: "string" },
          role: { type: "string" },
        },
        required: ["id", "username", "role"],
      },
    },
  ],
} as const;

export const TapParamsSchema = {
  type: "object",
  properties: {
    roundId: { type: "string" },
  },
  required: ["roundId"],
} as const;

export const Tap2xxResponseSchema = {
  type: "object",
  properties: {
    score: { type: "number" },
  },
  required: ["score"],
} as const;
