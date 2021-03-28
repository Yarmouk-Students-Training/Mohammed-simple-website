const express = require('express');
const UserController = require('../controllers/userController');

const Router = express.Router();

Router.get('/', UserController.All_Users ); // All Users
Router.get('/user', UserController.Specific_User ); // Specific User
Router.delete('/user/delete', UserController.Delete_User ); // Delete User
Router.put('/user/update', UserController.Update_User); // Update User 

module.exports = Router ;
