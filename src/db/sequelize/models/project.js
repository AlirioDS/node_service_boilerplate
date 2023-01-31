'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.hasMany( models.ProjectUserRoles, { foreignKey: 'user_id' } )
      Project.belongsTo( models.Clients, { foreignKey: 'client_id' } )
    }
  }
  Project.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    disable: DataTypes.BOOLEAN,
    client_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Projects',
  });
  return Project;
};