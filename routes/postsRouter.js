const express = require('express');
const PostController = require('../controllers/postController')

const Router = express.Router();

Router.get('/',PostController.All_Posts); // All posts
Router.post('/new', PostController.New_Post); // new Post
Router.get('/post', PostController.Specific_Post); // Specific post
Router.get('/user', PostController.Specific_User_Posts); // specific user's posts
Router.delete('/post/delete', PostController.Delete_Post); // Delete Post
Router.put('/post/update', PostController.Update_Post); // Update Post

module.exports = Router;