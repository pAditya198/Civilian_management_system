const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Medical = sequelize.define("medical", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  status:{
      type:Sequelize.ENUM('Positive', 'Negative'),
      allowNull:false,
  },
  isQuarantined:{
      type:Sequelize.BOOLEAN,
      allowNull:false,
  },
});


module.exports = Medical;
