const person = [];
const User = require("../model/user");
const Family = require("../model/family");
const Medical = require("../model/medical");

exports.getPage = async (req, res, next) => {
  const families = await Family.count();
  const users = await User.count();
  const covid= await Medical.count({where:{status:"Positive"}})
  const quarantined= await Medical.count({where:{isQuarantined:true}})
  res.render("main", {
    families,
    users,
    covid,
    quarantined,
  });
};

exports.getForm = (req, res, next) => {
  res.render("form", {
    editing: false,
  });
};

exports.getUserForm = (req, res, next) => {
  res.render("userForm", {
    familyId: "",
    editing: false,
  });
};

exports.getUserInfo=(req,res,next)=>{
  User.findByPk(req.params.id).then(user=>{
    var day = user.dob.getDate();
    var month = user.dob.getMonth() + 1;
    var year = user.dob.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var date = year + "-" + month + "-" + day;
    user.getMedical().then(medical=>{
      medical.getHistories().then(history=>{
        console.log(history)
        res.render("renderUser",{
          user,
          medical,
          history,
          date
        })
      })
    })
  })
}

exports.getFamily = (req, res, next) => {
  Family.findByPk(req.params.id).then((fam) => {
    fam.getUsers().then((users) => {
      res.render("renderFamily", {
        fam,
        person: users,
      });
    });
  });
};

exports.getEditUser = (req, res, next) => {
  User.findByPk(req.params.id).then((user) => {
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
      editing: false,
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
  console.log(entry.dob);
  Family.findAll({ where: { familyId: req.body.familyId } }).then((fam) => {
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

exports.viewPerson = (req, res, next) => {
  Family.findAll().then((fam) => {
    console.log(fam);
    res.render("renderPerson", { person: fam });
  });
};

exports.getEditFamily = (req, res, next) => {
  Family.findByPk(req.params.id).then((fam) => {
    res.render("form", {
      editing: true,
      fam,
    });
  });
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
      // const users= await fam.getUsers();
      // const destroy=fam.destroy()
      // return users
      return fam.destroy();
    })
    // .then((users,des) => {
    //   return users.forEach((user) => {
    //     return user.destroy();
    //   });
    //   // console.log("hello",users)
    // })
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
