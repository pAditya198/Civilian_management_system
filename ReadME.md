## Database Management System Project

As seen in light of recent events, it is particularly hard to keep track of
health and conditions of civilians affected by an epidemic like corona.Our
project is to build a database systems which not only keeps the records of
the condition and health of civilians according to area and country but also
provides details regarding each patient like quarantine status, Name of
hospital and treatment, improvement in health etc. which can be as crucial
as the treatment itself.

### Stack used are 

- Node
- Express js
- ejs - templating engine
- mysql -database


> Civilian_management_system/util/database.js 

```
const Sequelize = require("sequelize");
const sequelize = new Sequelize("database", "user", "password", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
```

__Don't forget to make changes to the above file__

Also add Database before hand

## How to start the server

> npm install

> npm start

**All the tables and their relation will be automatically be added by running the server but make sure sync({force:false}) instead of true this will rewrite your database each time server restarts.**
