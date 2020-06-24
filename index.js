const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const User=require("./model/user")
const Medical=require("./model/medical")
const History=require('./model/history')
const Family=require('./model/family')
const FamilyIndex=require('./model/familyIndex')

const userRoute = require("./route/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRoute);

Family.belongsToMany(User,{constraints: true, onDelete: 'CASCADE',through:FamilyIndex})
Medical.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasOne(Medical)
Medical.hasMany(History,{ constraints: true, onDelete: 'CASCADE' })

sequelize
// .sync({ force: true })
.sync()
.then((res) => {
  app.listen(3000, () => {
    console.log("server is up and running");
  });
});
