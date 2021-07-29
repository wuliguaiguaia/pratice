const Sequelize = require('sequelize')

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