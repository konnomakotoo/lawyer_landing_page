const bcrypt = require('bcrypt')
"use strict";

/* @type {import('sequelize-cli').Migration} */
module.exports = {
async up(queryInterface, Sequelize) {
await queryInterface.bulkInsert(
"Projects",
[
  {
      title: 'БЕСЕДА С МЭТРОМ Выпуск№11 (Юрий Павлович Иванов)',
      description: '',
      urlVideo: 'https://www.youtube.com/embed/ZWS_7BqKb7A?si=we7RHcbxtEeJV0El',
      urlImage: null,
      data: '2022-09-21',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  {
      title: 'БЕСЕДА С МЭТРОМ Выпуск №10 (Володина Светлана Игоревна)',
      description: '',
      urlVideo: 'https://www.youtube.com/embed/rab4NLfRH7Q?si=3lbGQ0im0TprUr8a',
      urlImage: null,
      data: '2022-09-21',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  {
      title: 'Чемпионат по футболу среди адвокатов от 13.08.2022',
      description: `13 августа 2022 года прошел первый чемпионат по мини-футболу «SEDLEX OPEN CUP”. Чемпионат состоялся на стадионе «Металлург» по адресу: Москва, ул.Новая дорога д.11 стр.1. В чемпионате приняли участие команды адвокатских палат, прокуратуры, университетов и бизнес-компаний.`,
      urlVideo: null,
      urlImage: 'https://www.bimakassociates.com/wp-content/uploads/2022/11/Football-law-sports-Bimak-Associates-Abuja-Law-Firm.jpg',
      data: '2022-08-13',
      categoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  {
      title: 'Адвология',
      description: 'Экосистема адвокатуры',
      urlVideo: null,
      urlImage: 'https://www.dolmanlaw.com/wp-content/uploads/2021/03/bigstock-Handshake-After-Good-Deal-Nego-348701158-scaled.jpg',
      data: '2022-12-19',
      categoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
  },
],
{}
);
},

async down(queryInterface, Sequelize) {
await queryInterface.bulkDelete("Projects", null, {});
},
};