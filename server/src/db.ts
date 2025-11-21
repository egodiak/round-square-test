import { Sequelize } from "sequelize";

import { POSTGRES_URI } from "./config";

const sequelize = new Sequelize(POSTGRES_URI);

export default sequelize;
