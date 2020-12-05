const sequelize = require('../database');
const bcrypt = require('bcrypt-nodejs');

const User = sequelize.define('User', {
  email: {
    type: sequelize.Sequelize.STRING,
    validate: {notEmpty: true, isEmail: true}
  },
  password: {
    type: sequelize.Sequelize.STRING,
    validate: {notEmpty: true, min: 6}
  },
  username: {
    type: sequelize.Sequelize.STRING,
    validate: {notEmpty: true}
  },
  session_key: {
    type: sequelize.Sequelize.STRING,
    validate: {notEmpty: true}
  },
    //is_active: {
        //type: sequelize.Sequelize.BOOLEAN
    //},

    /*{
    //username: sequelize.Sequelize.STRING,
    //email: sequelize.Sequelize.STRING,
    //password: sequelize.Sequelize.STRING,

    //last_name: sequelize.Sequelize.STRING,
    //active: sequelize.Sequelize.BOOLEAN,
    //admin: sequelize.Sequelize.BOOLEAN

    },*/
},
  {
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  freezeTableName: true,
});

User.beforeSave((user) => {
  if (user.changed('password')) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  }
});


User.comparePassword = function (password, user, cb) {
  bcrypt.compare(password, user.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

/*User.sync().then(() => {
    return sequelize.drop();
}).catch((e) => console.log(e));
*/

User.sync().then(function(){
  console.log('Tabela de usuários criada!');
});

console.log(User === sequelize.models.User);

module.exports = User;