import { FromSchema } from "json-schema-to-ts";

import {
  Login2xxResponseSchema,
  LoginBodySchema,
  RoundsCreateBodySchema,
  RoundsCreate2xxResponseSchema,
  RoundsReadParamsSchema,
  RoundsRead2xxResponseSchema,
  UsersCreateBodySchema,
  UsersCreate2xxResponseSchema,
  UsersReadParamsSchema,
  UsersRead2xxResponseSchema,
  TapParamsSchema,
  Tap2xxResponseSchema,
} from "./schemas";

export type LoginBody = FromSchema<typeof LoginBodySchema>;
export type Login2xxResponse = FromSchema<typeof Login2xxResponseSchema>;

export type RoundsCreateBody = FromSchema<typeof RoundsCreateBodySchema>;
export type RoundsCreate2xxResponse = FromSchema<
  typeof RoundsCreate2xxResponseSchema
>;
export type RoundsReadParams = FromSchema<typeof RoundsReadParamsSchema>;
export type RoundsRead2xxResponse = FromSchema<
  typeof RoundsRead2xxResponseSchema
>;

export type UsersCreateBody = FromSchema<typeof UsersCreateBodySchema>;
export type UsersCreate2xxResponse = FromSchema<
  typeof UsersCreate2xxResponseSchema
>;
export type UsersReadParams = FromSchema<typeof UsersReadParamsSchema>;
export type UsersRead2xxResponse = FromSchema<
  typeof UsersRead2xxResponseSchema
>;
export type TapParams = FromSchema<typeof TapParamsSchema>;
export type Tap2xxResponse = FromSchema<typeof Tap2xxResponseSchema>;
