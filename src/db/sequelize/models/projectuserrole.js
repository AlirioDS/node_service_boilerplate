'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProjectUserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProjectUserRole.belongsTo( models.Users, { foreignKey: 'user_id' } )
      ProjectUserRole.belongsTo( models.Roles, { foreignKey: 'role_id' }  )
      ProjectUserRole.belongsTo( models.Projects, { foreignKey: 'project_id' }  )
    }
  }
  ProjectUserRole.init({
    project_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    disable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ProjectUserRoles',
  });
  return ProjectUserRole;
};