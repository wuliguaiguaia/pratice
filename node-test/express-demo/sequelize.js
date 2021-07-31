const Sequelize = require('sequelize')
const UserModel = require('./model/user')
const sequelize = new Sequelize('test', 'root', 'mysql123', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('success');
  })
  .catch(() => {
    console.log('error');
  })

const User = UserModel(sequelize, Sequelize.DataTypes)
// User.sync()
sequelize.User = User
module.exports = sequelize