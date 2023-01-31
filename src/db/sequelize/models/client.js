'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Client.hasMany( models.Projects, { foreignKey: 'client_id' } )
    }
  }
  Client.init({
    name: DataTypes.STRING,
    business_name: DataTypes.STRING,
    rut: DataTypes.STRING,
    direction: DataTypes.TEXT,
    phone: DataTypes.STRING,
    description: DataTypes.STRING,
    legal_representative: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clients',
  });
  return Client;
};