'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Team.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    image: DataTypes.STRING,
    position: DataTypes.STRING,
    area: DataTypes.STRING,
    address: DataTypes.STRING,
    specialization: DataTypes.ARRAY(DataTypes.STRING),
    experience: DataTypes.TEXT,
    education: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};