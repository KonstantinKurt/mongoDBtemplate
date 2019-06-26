const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useFindAndModify: true,
    autoReconnect: true
};
module.exports = function () {
    mongoose.connect(process.env.DB_CONN,
        options,
        (err) =>  {
        err && console.log(err);
        console.log('Database connected successfully!');
    });
};
