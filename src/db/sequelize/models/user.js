'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany( models.ProjectUserRoles, { foreignKey: 'user_id' } )
    }
  }
  User.init({
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    rut: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    disable: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: async user => {
       if (user.password) {
        const salt = await bcrypt.genSaltSync(10, 'a');
        user.password = bcrypt.hashSync(user.password, salt);
       }
      },
      beforeUpdate: async user => {
       if (user.password) {
        const salt = await bcrypt.genSaltSync(10, 'a');
        user.password = bcrypt.hashSync(user.password, salt);
       }
      }
    },
    sequelize,
    modelName: 'Users',
  });

  User.prototype.validPassword = async function(password) {
    return await bcrypt.compareSync( password, this.password );
  }

  return User;
};