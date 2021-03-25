const express = require('express');
const PostController = require('../controllers/postController')

const Router = express.Router();

Router.get('/',PostController.All_Posts); // All posts

Router.post('/new/:id', PostController.New_Post); // new Post

Router.get('/post/:id', PostController.Specific_Post); // Specific post

Router.get('/:id', PostController.Specific_User_Posts); // specific user's posts

Router.delete('/post/:id', PostController.Delete_Post); // Delete Post

module.exports = Router;