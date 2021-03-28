const express = require('express');
const Controller = require('../controllers/reactionController');

const Router = express.Router();

Router.post('/new', Controller.Add_reaction);
Router.get('/post', Controller.Post_reactions);
Router.delete('/remove', Controller.Remove_reaction);
Router.put('/update',Controller.Update_reaction);

module.exports = Router;