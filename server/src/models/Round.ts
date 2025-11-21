import { randomUUID } from "crypto";
import { DataTypes, Model, literal } from "sequelize";

import sequelize from "../db";
import { COOLDOWN_DURATION, ROUND_DURATION } from "../config";
import { RoundStatus } from "../types";

class Round extends Model {
  id!: string;
  startDate!: Date;
  endDate!: Date;
  status!: RoundStatus;
}

Round.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => randomUUID(),
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: literal(
        `CURRENT_TIMESTAMP + '${COOLDOWN_DURATION}sec'::interval`
      ),
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: literal(
        `CURRENT_TIMESTAMP + '${
          COOLDOWN_DURATION + ROUND_DURATION
        }sec'::interval`
      ),
    },
    status: {
      type: DataTypes.VIRTUAL,
      get() {
        const now = Date.now();
        return this.startDate.getTime() > now
          ? RoundStatus.COOLDOWN
          : this.endDate.getTime() > now
          ? RoundStatus.ACTIVE
          : RoundStatus.FINISHED;
      },
    },
  },
  {
    sequelize,
    modelName: "Round",
    tableName: "rounds",
  }
);

export default Round;
