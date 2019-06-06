const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js'); 

router.post('/user', userController.addUser); // add User to db;
router.delete('/user/:id', userController.deleteUser); // delete User by _id;
router.patch('/user/:id', userController.updatedUser); // update User by _id:
router.get('/users', userController.getUsers); // get all Users from db;
router.get('/user/:usersId', userController.getUser); // get User from db by _id;
router.patch('/users', userController.changeRating); // changes rating to all Users by the coff, which indicates by req.param;
router.post('/user/:usersId', userController.addPostSchema); //add postSchema to user post array;
router.delete('/user/post/:usersId', userController.deletePostSchemaByValue); // deletes users post from array by its value;
router.get("/user/articles/:usersId", userController.getAllUsersArticle); //populates all users articles;
router.get("/user/articles/comments/:usersId", userController.getAllUsersArticleWithComments); //populates all users articles with comments (deeply nested associations);
router.delete("/user/nested/:usersId", userController.removeWithArticles); //Remove user with nested articles;
router.get("/user/skip", userController.skipAndLimit); // skip and limit just for test;

module.exports = router;