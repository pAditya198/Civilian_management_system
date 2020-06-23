const Sequelize=require('sequelize')

const sequelize=require('../util/database')

const Family=sequelize.define('family',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      familyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique:true
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
})

module.exports = Family