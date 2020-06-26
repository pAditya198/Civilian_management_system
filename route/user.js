const path = require("path");

const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.get("/", userController.getPage);

router.get("/addPerson", userController.getForm);

router.post("/postFamily", userController.postFamily);

router.get("/addUser", userController.getUserForm);

router.get("/userInfo/:id", userController.getUserInfo);

router.post("/postPerson", userController.postUser);

router.post("/postMedical", userController.postMedical);

router.post("/postHistory", userController.postHistory);

router.get("/viewPerson", userController.viewPerson);

router.get("/editFamily/:id", userController.getEditFamily);

router.post("/editFamily/:id", userController.editFamily);

router.post("/deleteFamily/:id", userController.deleteFamily);

router.get("/editUser/:id", userController.getEditUser);

router.post("/editUser/:id", userController.editUser);

router.post("/deleteUser/:id", userController.deleteUser);

router.get("/family/:id", userController.getFamily);

router.get("/searchCovid",userController.getSearchPage)
router.post("/searchCovid/:type",userController.getSearchResult)

module.exports = router;
