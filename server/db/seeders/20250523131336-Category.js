const bcrypt = require('bcrypt')
"use strict";

/* @type {import('sequelize-cli').Migration} */
module.exports = {
async up(queryInterface, Sequelize) {
await queryInterface.bulkInsert(
"Categories",
[
  {
      title: "Беседа с мэтром",
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  {
      title: "Футбол",
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  {
      title: "Адвология",
      createdAt: new Date(),
      updatedAt: new Date(),
  },
],
{}
);
},

async down(queryInterface, Sequelize) {
await queryInterface.bulkDelete("Categories", null, {});
},
};