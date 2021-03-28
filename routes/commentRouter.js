const express = require('express');
const Controller = require('../controllers/commentController');
const Router = express.Router();

Router.post('/new', Controller.Add_Comment);
Router.delete('/delete', Controller.Remove_Comment);
Router.get('/post', Controller.Post_Comments);
Router.put('/update', Controller.Update_Comment);

module.exports = Router;