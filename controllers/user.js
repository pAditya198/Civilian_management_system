const person = [];
const User = require("../model/user");
const Family = require("../model/family");

exports.getPage = (req, res, next) => {
  res.render("main", { count: person.length });
};

exports.getForm = (req, res, next) => {
  res.render("form");
};

exports.postForm = (req, res, next) => {

  const family={
    familyId:2,
    Address:"jhvshfjsdh",
    district:"allahabad",
    state:"up",
    postal:"211011",
    country:"India"
  }
  const entry = {};
  entry.name = req.body.name;
  entry.age = req.body.age;
  entry.sex = "M";
  entry.dob = req.body.date;
  entry.email = "p.aditya.198@gmail.com";
  entry.phone = 7985565341;

  Family.create(family).then(fam=>{
    fam.createUser(entry)
  })

  person.push(entry);
  // User.create(entry);
  res.redirect("/");
};

exports.viewPerson = (req, res, next) => {
  res.render("renderPerson", {
    person,
  });
};
