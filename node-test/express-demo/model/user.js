module.exports = function (sequelize, dataTypes) {
  return sequelize.define('Userx', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER,
    },
    username: {
      type: dataTypes.CHAR(255),
      allowNull: false,
    },
    password: {
      type: dataTypes.CHAR(255),
      allowNull: false,
    },
    userId: {
      type: dataTypes.CHAR(36),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Users'
  });
}