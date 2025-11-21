import { type RouteOptions } from "fastify";

import Round from "../../../models/Round";
import Score from "../../../models/Score";
import User from "../../../models/User";
import getSession from "../../../utils/getSession";
import {
  RoundsRead2xxResponseSchema,
  RoundsReadParamsSchema,
} from "../../schemas";
import { RoundsReadParams } from "../../types";
import { RoundStatus } from "../../../types";
import { literal } from "sequelize";

export default <RouteOptions>{
  method: "GET",
  url: "/rounds/:id?",
  schema: {
    params: RoundsReadParamsSchema,
    response: { "2xx": RoundsRead2xxResponseSchema },
  },
  handler: async (req, res) => {
    const { id } = <RoundsReadParams>req.params;
    return id
      ? Round.findByPk(id).then((round) =>
          round
            ? round.status === RoundStatus.FINISHED
              ? Promise.all([
                  Score.findOne({
                    where: { userId: getSession(req).userId, roundId: id },
                  }),
                  Score.findOne({
                    where: { roundId: id },
                    order: [["value", "DESC"]],
                    limit: 1,
                    include: { model: User, as: "user" },
                  }),
                  Score.sum("value", {
                    where: { roundId: id },
                  }),
                ]).then(([ownScore, maxScore, totalScore]) =>
                  Object.assign(round.toJSON(), {
                    ...(maxScore && {
                      winner: {
                        userId: maxScore.userId,
                        name: maxScore.user?.name,
                        score: maxScore.value,
                      },
                    }),
                    ...(ownScore && { ownScore: ownScore?.value }),
                    ...(totalScore && { totalScore }),
                  })
                )
              : round
            : res.code(404).send("Not Found")
        )
      : Round.findAll({ order: [["startDate", "DESC"]] });
  },
};
