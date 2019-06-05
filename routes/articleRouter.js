const express = require('express');
const router = express.Router();

const articleController = require('../controllers/articleController.js');

router.post('/article/:usersId',articleController.addArticle);
router.get('/article/:usersId', articleController.getPosts);

module.exports = router;