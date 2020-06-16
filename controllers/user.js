const person = [];

exports.getPage=(req,res,next)=>{
    res.render("main",{count:person.length})
}

exports.getForm = (req, res, next) => {
  res.render("form");
};

exports.postForm = (req, res, next) => {
  const entry = {};
  entry.name = req.body.name;
  entry.age = req.body.age;
  person.push(entry);
  res.redirect("/");
};

exports.viewPerson = (req, res, next) => {
  res.render("renderPerson", {
    person,
  });
};
