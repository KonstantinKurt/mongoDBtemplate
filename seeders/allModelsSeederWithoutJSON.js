const mongoose = require('mongoose');

const Article = require('../models/Article.js');
const User = require('../models/User.js');
const Comment = require('../models/Comment.js');



(async () => {
    await mongoose.connect(`mongodb://localhost:27017/mongoTemplate`, {useNewUrlParser: true}, function (err) {
        err && console.log(err);
        mongoose.connection.db.dropDatabase();
    });
    const usersId = new mongoose.Types.ObjectId;
    const articleId = new mongoose.Types.ObjectId;
    const commentId =  new mongoose.Types.ObjectId;
    Promise
        .all([
            new User({
                _id: usersId ,
                password: "12345",
                email: "userEmail@gmail.com",
                name: "userName",
                articles:[articleId],
                rating: Math.floor(Math.random() * (50000 - 0)) + 0,
                premium: true
            })
                .save(),
            new Article({
                _id: articleId,
                title: "article title",
                content: "article content",
                author: usersId,
                comments:[commentId],
                createdDate: Date.now(),
            })
                .save(),
            new Comment({
                _id: commentId,
                author: usersId,
                content: "comment content",
                article: articleId
            })
                .save(),
        ])
        .then(() => {
            console.log('DB updated');
            mongoose.disconnect();
        })
        .catch(err => {
            console.log(err.message);
            mongoose.disconnect();
        })
})();
