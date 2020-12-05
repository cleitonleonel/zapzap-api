const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
});

try {
  sequelize.authenticate().then(r =>
    console.log('Connection has been established successfully.')
  );
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;