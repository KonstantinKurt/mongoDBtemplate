const assert = require("assert");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const User = require('../models/User.js');

before((done) => {
    mongoose.connect('mongodb://localhost/test');
    mongoose.connection
        .once('open', () => {console.log('Connected!'); done();})
        .on('error', (error) => {
            console.warn('Error : ', error);
        });
});

beforeEach((done) => {
    mongoose.connection.dropCollection("users", () => {
        done();
    });
});

describe("Creating User", () => {

    it('save a User', (done) => {
        const user = new User({
            name: "Test",
            password: "testPassword",
            email: "testEmail@gmail.com"
        });
        user.save()
            .then(() => {
                assert(!user.isNew);
                done();
            });
    })
})