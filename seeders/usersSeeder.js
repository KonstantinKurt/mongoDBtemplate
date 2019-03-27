const mongoose = require("mongoose");
const fs = require("fs");

const User = require('./UserForSeeder.js');

function exit() {
    mongoose.disconnect();
    console.log("Db updated");
};
(async function() {
    await mongoose.connect(
        `mongodb://localhost:27017/mongoTemplate`, {
            useNewUrlParser: true
        },
        function(err) {
            if (err) throw err;
            console.log("Successfully connected");
        }
    );
     (function() {
         fs.readFile("users.json", "utf8", function(err, data) {
            if (err) {
                console.log(err);
            }
            let users = JSON.parse(data);
            for (let i = 0; i < users.length; i++) {
                let user = new User(JSON.parse(users[i]));
                console.log(user);
                user.save();
            }
        });
        
    }());
}());