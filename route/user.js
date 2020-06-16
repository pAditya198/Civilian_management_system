const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/',userController.getPage)

router.get('/addPerson',userController.getForm)

router.post('/postPerson',userController.postForm)

router.get('/viewPerson',userController.viewPerson)

module.exports=router