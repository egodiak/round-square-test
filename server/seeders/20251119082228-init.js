"use strict";

const dotenv = require("dotenv");
const env = require("env-var");

dotenv.config({ path: process.env.ENV_FILE || "./.env" });

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: "e494aef1-7a87-480c-863a-3501f7927849",
          name: "Администратор",
          username: "admin",
          password: "TopSecret!",
          role: env.get("ADMIN_ROLE").default("admin").asString(),
        },
        {
          id: "cd1dc000-bb56-47be-b820-c412be43a8e0",
          name: "Иван",
          username: "ivan",
          password: "TopSecret!",
          role: env.get("GENERIC_ROLE").default("survival").asString(),
        },
        {
          id: "5911a1d1-b2e4-4751-b476-396cc895589e",
          name: "Пётр",
          username: "peter",
          password: "TopSecret!",
          role: env.get("GENERIC_ROLE").default("survival").asString(),
        },
        {
          id: "ea6c4b39-1646-4b4a-b9ae-71824714f861",
          name: "Никита",
          username: "nikita",
          password: "TopSecret!",
          role: env.get("SPECIAL_ROLE").default("nikita").asString(),
        },
      ],
      {}
    );
  },
};
