const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/',userController.getPage)

router.get('/addPerson',userController.getForm)

router.post('/postFamily',userController.postFamily)

router.get('/addUser',userController.getUserForm)

router.post('/postPerson',userController.postUser)

router.get('/viewPerson',userController.viewPerson)

module.exports=router