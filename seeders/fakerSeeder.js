const mongoose = require('mongoose');
const faker = require('faker');
const lodash = require('lodash');

const Article = require('../models/Article.js');
const User = require('../models/User.js');
const Comment = require('../models/Comment.js');

(async () => {
    await mongoose.connect(`mongodb://localhost:27017/mongoTemplate`, {useNewUrlParser: true}, function (err) {
        err && console.log(err);
        //mongoose.connection.db.dropDatabase();
    });
    const usersId = new mongoose.Types.ObjectId();
    const articleId = new  mongoose.Types.ObjectId;
    const commentId = new  mongoose.Types.ObjectId;
    const randomPremium = lodash.sample([true, false]);
    Promise
        .all([
            new User({
                _id: usersId,
                password: faker.internet.password(),
                email: faker.internet.email(),
                name: faker.name.findName(),
                articles: [articleId],
                rating: faker.random.number(),
                premium: randomPremium
            })
                .save(),
            new Article({
                _id: articleId,
                title: faker.lorem.words(),
                content: faker.lorem.words(),
                author: usersId,
                comments: [commentId],
                createdDate: faker.date.past(),
            })
                .save(),
            new Comment({
                _id: commentId,
                author: usersId,
                content: faker.lorem.words(),
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