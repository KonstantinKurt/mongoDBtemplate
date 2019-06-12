const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js'); 

router.post('/user', userController.addUser); // add User to db;
router.delete('/user/:id', userController.deleteUser); // delete User by _id;
router.patch('/user/:id', userController.updatedUser); // update User by _id:
router.get('/users', userController.getUsers); // get all Users from db;
router.get('/user/:usersId', userController.getUser); // get User from db by _id;
router.patch('/users', userController.changeRating); // changes rating to all Users by the coff, which indicates by req.param ($inc query);
router.post('/user/:usersId', userController.addPostSchema); //add postSchema to user post array;
router.delete('/user/post/:usersId', userController.deletePostSchemaByValue); // deletes users post from array by its value;
router.get("/user/articles/:usersId", userController.getAllUsersArticle); //populates all users articles;
router.get("/user/articles/comments/:usersId", userController.getAllUsersArticleWithComments); //populates all users articles with comments (deeply nested associations);
router.delete("/user/nested/:usersId", userController.removeWithArticles); //Remove user with nested articles by model middleware;
router.get("/user/skip", userController.skipAndLimit); // skip and limit just for test;
router.get("/users/sort/:sortProperty", userController.sortByProperty); //sorts users by given property;
router.get("/users/where", userController.getUsersByRatingInterval); // Query for getting users by rating interval with query builder;
router.get("/users/where/json", userController.getUsersByRatingIntervalWithJSON); // Query for users by rating interval with JSON;
router.get("/users/text/:text", userController.getUserByNameWithTextQuery); // Query to get user with $text operator;
router.patch("/users/multiple", userController.updateMultipleUsersRating); // Update multiple users rating ($in, updateMany);
router.patch("/users/multiple/operator", userController.updateMultipleUsersRatingByMultipleOperator); // Update multiple users rating ($in, update, multiple:true);
router.patch("/users/multiple/array", userController.updateMultipleUsersRatingReturnObjectsArray); //  Update multiple users rating, return obj arr (promise all);
router.patch("/users/location/add/:usersId", userController.addLocationSchema); // Adds geolocation schema to user;

module.exports = router;