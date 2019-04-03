const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController.js'); 

router.post('/post', postController.addPost);
router.get('/posts', postController.getPosts);

module.exports = router;