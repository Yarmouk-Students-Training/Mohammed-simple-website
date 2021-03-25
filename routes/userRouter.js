const express = require('express');
const UserController = require('../controllers/userController');

const Router = express.Router();

Router.get('/', UserController.All_Users );

Router.get('/user/:id', UserController.Specific_User );

Router.delete('/user/:id', UserController.Delete_User );

module.exports = Router ;

