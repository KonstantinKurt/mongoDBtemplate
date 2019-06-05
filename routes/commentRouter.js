const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController.js');


router.post('/comment/:usersId/:articlesId', commentController.addComment);




module.exports = router;