const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true }, function(err) {
        err && console.log(err);
        console.log('Database connected succesfully!');
    });
};