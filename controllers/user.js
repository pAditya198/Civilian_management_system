const person = [];
const User = require("../model/user");
const Family = require("../model/family");
const Medical = require("../model/medical");

exports.getPage = (req, res, next) => {
  Family.findAll().then((fam) => {
    res.render("main", { count: fam.length });
  });
};

exports.getForm = (req, res, next) => {
  res.render("form");
};

exports.getUserForm = (req, res, next) => {
  res.render("userForm", {
    familyId: "",
  });
};

exports.postFamily = (req, res, next) => {
  const family = {
    familyId: req.body.familyId,
    Address: req.body.Address,
    district: req.body.district,
    state: req.body.state,
    postal: req.body.postal,
    country: req.body.country,
  };

  Family.create(family).then((fam) => {
    res.render("userForm", {
      familyId: fam.familyId,
    });
  });
};

exports.postUser = (req, res, next) => {
  const entry = {
    name: req.body.name,
    age: req.body.age,
    sex: req.body.sex,
    dob: req.body.dob,
    email: req.body.email,
    phone: req.body.phone,
  };
  Family.findAll({ where: { familyId: req.body.familyId } }).then((fam) => {
    console.log(fam[0].familyId);
    fam[0].createUser(entry).then((user) => {
      res.render("medical", {
        id: user.id,
      });
    });
  });
};

exports.postMedical = (req, res, next) => {
  const medical = {
    status: req.body.status,
    isQuarantined: req.body.isQuarantined,
  };
  User.findByPk(req.body.id).then((user) => {
    user.createMedical(medical).then((med) => {
      res.render("history", {
        id: med.id,
      });
    });
  });
};

exports.postHistory = (req, res, next) => {
  const history = {
    status: req.body.status,
    name: req.body.name,
  };
  Medical.findByPk(req.body.id).then((user) => {
    user.createHistory(history);
  });
  res.redirect("/");
};

// exports.postForm = (req, res, next) => {
//   const entry = {};
//   entry.name = req.body.name;
//   entry.age = req.body.age;
//   entry.sex = "M";
//   entry.dob = req.body.date;
//   entry.email = "p.aditya.198@gmail.com";
//   entry.phone = 7985565341;
//   if (!req.body.familyId) {
//     const family = {
//       familyId: 2,
//       Address: "jhvshfjsdh",
//       district: "allahabad",
//       state: "up",
//       postal: "211011",
//       country: "India",
//     };

//     Family.create(family).then((fam) => {
//       fam.createUser(entry);
//     });
//   }

//   Family.find(fam=>fam.familyId===req.body.familyId).then(fam=>{
//     fam.createUser(entry);
//   })
//   // person.push(entry);
//   // User.create(entry);
//   res.redirect("/");
// };

exports.viewPerson = (req, res, next) => {
  Family.findAll().then((fam) => {
    console.log(fam);
    res.render("renderPerson", { person: fam });
  });
};

exports.editFamily = (req, res, next) => {
  const family = {
    familyId: req.body.familyId,
    Address: req.body.Address,
    district: req.body.district,
    state: req.body.state,
    postal: req.body.postal,
    country: req.body.country,
  };
  Family.findAll({ where: { familyId: req.body.familyId } })
    .then((fam) => {
      // rewrite the edited data here
      fam[0] = family;
      return fam[0].save();
    })
    .then((result) => {
      console.log("Family Updated");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.editUser = (req, res, next) => {
  const entry = {
    name: req.body.name,
    age: req.body.age,
    sex: req.body.sex,
    dob: req.body.dob,
    email: req.body.email,
    phone: req.body.phone,
  };
  User.findByPk(req.body.id)
    .then((user) => {
      // rewrite the edited data here
      user = entry;
      return user.save();
    })
    .then((result) => {
      console.log("Family Updated");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.deleteFamily = (req, res, next) => {
  Family.findAll({ where: { familyId: req.body.familyId } })
    .then((fam) => {
      return fam[0].destroy();
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.deleteUser = (req, res, next) => {
  User.findByPk(req.body.id)
    .then((user) => {
      return user.destroy();
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
