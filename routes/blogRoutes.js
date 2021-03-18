const express = require('express');
const Controller = require('../Controllers/BlogController');
const router = express.Router();

router.get('/',Controller.blog_index);
router.get('/create', Controller.blog_create_get);
router.post('/',Controller.blog_create_post);
router.get('/:id', Controller.blog_details);
router.delete('/:id',Controller.blog_delete);

module.exports = router;