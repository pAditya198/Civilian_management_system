const Sequelize=require('sequelize')

const sequelize=require('../util/database')

const FamilyIndex=sequelize.define('family-index',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
})

module.exports = FamilyIndex