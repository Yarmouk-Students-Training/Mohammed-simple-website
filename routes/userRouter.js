const express = require('express');
const UserController = require('../controllers/userController');

const Router = express.Router();

Router.get('/', UserController.All_Users ); // All Users 
Router.get('/user/:id', UserController.Specific_User ); // Specific User
Router.delete('/user/:id', UserController.Delete_User ); // Delete Specific User

module.exports = Router ;

