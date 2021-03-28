const express = require('express');
const RelationController = require('../controllers/relationController.js');

const Router = express.Router();

Router.get('/all',RelationController.All_relations);
Router.post('/add', RelationController.Add_relation );
Router.get('/user', RelationController.User_relations);
Router.put('/update', RelationController.Update_relation);

module.exports = Router;