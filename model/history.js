const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const History = sequelize.define("history", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  status: Sequelize.STRING,
});
module.exports=History