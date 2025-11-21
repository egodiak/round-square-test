"use strict";

const dotenv = require("dotenv");
const env = require("env-var");

const COOLDOWN_DURATION = env
  .get("COOLDOWN_DURATION")
  .default(30)
  .asIntPositive();
const ROUND_DURATION = env.get("ROUND_DURATION").default(60).asIntPositive();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    await queryInterface.createTable("rounds", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    await queryInterface.createTable("scores", {
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      roundId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "rounds",
          key: "id",
        },
      },
      tapsCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    await queryInterface.addIndex("scores", ["userId", "roundId"], {
      primaryKey: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("scores");
    await queryInterface.dropTable("rounds");
    await queryInterface.dropTable("users");
  },
};
