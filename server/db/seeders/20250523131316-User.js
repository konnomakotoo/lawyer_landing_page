const bcrypt = require('bcrypt')
"use strict";

/* @type {import('sequelize-cli').Migration} */
module.exports = {
async up(queryInterface, Sequelize) {
await queryInterface.bulkInsert(
"Users",
[
  {
      name: "Александра",
      lastName: 'Александрова',
      email: "s@s",
      phoneNumber: '+7(495)480-87-28',
      password: await bcrypt.hash('sasha', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  {
      name: "Михаил",
      lastName: 'Михаилов',
      email: "m@m",
      phoneNumber: '+7(495)480-87-28',
      password: await bcrypt.hash('misha', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
  },
],
{}
);
},

async down(queryInterface, Sequelize) {
await queryInterface.bulkDelete("Users", null, {});
},
};