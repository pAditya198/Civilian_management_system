const person = [];
const User = require("../model/user");
const Family = require("../model/family");
const Medical = require("../model/medical");

const { Op } = require("sequelize");

exports.getPage = async (req, res, next) => {
  const families = await Family.count();
  const users = await User.count();
  const covid = await Medical.count({ where: { status: "Positive" } });
  const quarantined = await Medical.count({ where: { isQuarantined: true } });
  res
    .render("main", {
      families,
      users,
      covid,
      quarantined,
      path: "/",
    })
    
};

exports.getForm = (req, res, next) => {
  res
    .render("form", {
      editing: false,
    })
    .catch((err) => console.log(err));
};

exports.getUserForm = (req, res, next) => {
  res
    .render("userForm", {
      familyId: "",
      editing: false,
    })
    .catch((err) => console.log(err));
};

exports.getUserInfo = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      var day = user.dob.getDate();
      var month = user.dob.getMonth() + 1;
      var year = user.dob.getFullYear();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;

      var date = year + "-" + month + "-" + day;
      user.getMedical().then((medical) => {
        medical.getHistories().then((history) => {
          console.log(history);
          res.render("renderUser", {
            user,
            medical,
            history,
            date,
            path: "/viewPerson",
          });
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.getFamily = (req, res, next) => {
  Family.findByPk(req.params.id)
    .then((fam) => {
      fam.getUsers().then((users) => {
        res.render("renderFamily", {
          fam,
          person: users,
          path: "/viewPerson",
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditUser = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      var day = user.dob.getDate();
      var month = user.dob.getMonth() + 1;
      var year = user.dob.getFullYear();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;

      var date = year + "-" + month + "-" + day;
      res.render("userForm", {
        familyId: user.familyId,
        user,
        date,
        editing: true,
      });
    })
    .catch((err) => console.log(err));
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

  Family.create(family)
    .then((fam) => {
      res.render("userForm", {
        familyId: fam.familyId,
        editing: false,
      });
    })
    .catch((err) => console.log(err));
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
  console.log(entry.dob);
  Family.findAll({ where: { familyId: req.body.familyId } })
    .then((fam) => {
      fam[0].createUser(entry).then((user) => {
        res.render("medical", {
          id: user.id,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postMedical = (req, res, next) => {
  const medical = {
    status: req.body.status,
    isQuarantined: req.body.isQuarantined,
  };
  User.findByPk(req.body.id)
    .then((user) => {
      user.createMedical(medical).then((med) => {
        res.render("history", {
          id: med.id,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postHistory = (req, res, next) => {
  const history = {
    status: req.body.status,
    name: req.body.name,
  };
  Medical.findByPk(req.body.id)
    .then((user) => {
      user.createHistory(history);
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.viewPerson = (req, res, next) => {
  Family.findAll()
    .then((fam) => {
      console.log(fam);
      res.render("renderPerson", { person: fam, path: "/viewPerson" });
    })
    .catch((err) => console.log(err));
};

exports.getEditFamily = (req, res, next) => {
  Family.findByPk(req.params.id)
    .then((fam) => {
      res.render("form", {
        editing: true,
        fam,
      });
    })
    .catch((err) => console.log(err));
};

exports.editFamily = (req, res, next) => {
  Family.findByPk(req.params.id)
    .then((fam) => {
      // rewrite the edited data here
      fam.familyId = req.body.familyId;
      fam.Address = req.body.Address;
      fam.district = req.body.district;
      fam.state = req.body.state;
      fam.postal = req.body.postal;
      fam.country = req.body.country;
      return fam.save();
    })
    .then((result) => {
      console.log("Family Updated");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.editUser = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      // rewrite the edited data here
      user.name = req.body.name;
      user.age = req.body.age;
      user.sex = req.body.sex;
      user.dob = req.body.dob;
      user.email = req.body.email;
      user.phone = req.body.phone;
      return user.save();
    })
    .then((result) => {
      console.log("Family Updated");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.deleteFamily = (req, res, next) => {
  Family.findByPk(req.params.id)
    .then(async (fam) => {
      return fam.destroy();
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.deleteUser = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      return user.destroy();
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getSearchPage = (req, res, next) => {
  Family.findAll({ attributes: ["state", "district"], raw: true })
    .then((state) => {
      var newArr = [];
      var district = [];
      for (const key in state) {
        if (state.hasOwnProperty(key)) {
          newArr.push(state[key].state);
          district.push(state[key].district);
        }
      }
      newArr = new Set([...newArr]);
      district = new Set([...district]);
      req.state = newArr;
      req.district = district;
      res.render("searchCovid", {
        states: newArr,
        district,
        path: "/searchCovid",
      });
    })
    .catch((err) => console.log(err));
};
exports.getSearchResult = (req, res, next) => {
  const type = req.params.type;
  Family.findAll({
    attributes: ["id"],
    where: { [type]: req.body[type] },
    raw: true,
  }).then((fam) => {
    var id = [];
    for (const key in fam) {
      if (fam.hasOwnProperty(key)) {
        id.push(fam[key].id);
      }
    }
    console.log(id);
    User.findAll({
      attributes: ["id"],
      where: {
        familyId: {
          [Op.or]: [id],
        },
      },
      raw: true,
    }).then((user) => {
      Medical.findAll({
        attributes: ["userId"],
        where: {
          status: "Positive",
        },
      })
        .then((positive) => {
          console.log(user);
          console.log(positive);
          res.render("searchCovid", {
            states: null,
            district: null,
            fam: user,
            location: req.body[type],
            positive,
            path: "/searchCovid",
          });
        })
        .catch((err) => console.log(err));
    });
  });
};
