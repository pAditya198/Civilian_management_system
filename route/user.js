const path = require("path");

const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.get("/", userController.getPage);

router.get("/addPerson", userController.getForm);

router.post("/postFamily", userController.postFamily);

router.get("/addUser", userController.getUserForm);

router.post("/postPerson", userController.postUser);

router.post("/postMedical", userController.postMedical);

router.post("/postHistory", userController.postHistory);

router.get("/viewPerson", userController.viewPerson);

router.post("/editFamily", userController.editFamily);

router.delete("/deleteFamily", userController.deleteFamily);

router.post("/editUser", userController.editUser);

router.delete("/deleteUser", userController.deleteUser);

module.exports = router;
