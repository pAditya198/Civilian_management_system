const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sex: {
    type: Sequelize.ENUM('M', 'F','Others'),
    allowNull: false,
  },
  dob: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  email: Sequelize.STRING,
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
},
});

module.exports = User;
