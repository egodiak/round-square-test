import { DataTypes, Model } from "sequelize";

import sequelize from "../db";

import Round from "./Round";
import User from "./User";

class Score extends Model {
  userId!: string;
  roundId!: string;
  tapsCount!: number;
  value!: number;
  user?: User;
  round?: Round;
}

Score.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    roundId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Round,
        key: "id",
      },
    },
    tapsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Score",
    tableName: "scores",
  }
);
Score.removeAttribute("id");

Score.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Score, { foreignKey: "userId", as: "scores" });
Score.belongsTo(Round, { foreignKey: "roundId", as: "round" });
Round.hasMany(Score, { foreignKey: "roundId", as: "scores" });

export default Score;
