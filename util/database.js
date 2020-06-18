const Sequelize = require("sequelize");

const sequelize = new Sequelize("covid19", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
