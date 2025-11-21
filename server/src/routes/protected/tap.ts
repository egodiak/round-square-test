import { type RouteOptions } from "fastify";
import { Tap2xxResponseSchema, TapParamsSchema } from "../schemas";
import { TapParams } from "../types";
import db from "../../db";
import Score from "../../models/Score";
import Round from "../../models/Round";
import { literal, Op } from "sequelize";
import getSession from "../../utils/getSession";
import { MAGIC_TAP_NUMBER, MAGIC_TAP_SCORE, SPECIAL_ROLE } from "../../config";

export default <RouteOptions>{
  method: "PUT",
  url: "/tap/:roundId",
  schema: {
    params: TapParamsSchema,
    response: { "2xx": Tap2xxResponseSchema },
  },
  handler: async (req, res) => {
    const { userId, role } = getSession(req);
    const { roundId } = <TapParams>req.params;

    if (role === SPECIAL_ROLE) return { score: 0 };

    return db.transaction(async (transaction) => {
      const isRoundActive =
        (await Round.count({
          where: {
            id: roundId,
            [Op.and]: literal(
              `CURRENT_TIMESTAMP BETWEEN "startDate" AND "endDate"`
            ),
          },
          transaction,
        })) > 0;

      if (!isRoundActive) return res.code(400).send("Bad Request");

      const [score] = await Score.findOrCreate({
        where: { userId, roundId },
        defaults: { userId, roundId, tapsCount: 0, score: 0 },
        transaction,
      });

      const tapsCount = score.tapsCount + 1;
      const magicTapsCount = Math.floor(tapsCount / MAGIC_TAP_NUMBER);

      const newScore =
        tapsCount - magicTapsCount + magicTapsCount * MAGIC_TAP_SCORE;

      await score.update({ tapsCount, value: newScore }, { transaction });

      return { score: newScore };
    });
  },
};
