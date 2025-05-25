'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'projects',
        onDelete: 'CASCADE',
      })
    }
  }
  Project.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    urlVideo: DataTypes.STRING,
    urlImage: DataTypes.STRING,
    data: DataTypes.DATEONLY,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};